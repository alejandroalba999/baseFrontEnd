import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthComponent } from './component/auth/auth.component';
import { UsuarioComponent } from './component/dashboard/usuario/usuario.component';
import { ServiciosService } from './servicios.service';
import Swal from 'sweetalert2';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MainComponent } from './component/dashboard/main/main.component';
import { GestionRutasComponent } from './component/dashboard/gestion-rutas/gestion-rutas.component';

const toastMixin = Swal.mixin({
  toast: true,
  icon: 'success',
  title: 'General Title',
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

@Injectable({ providedIn: 'root' })
export class getRol implements CanActivate {
  decode: any;
  constructor(private service: ServiciosService, private route: Router) { }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const token = localStorage.getItem('tokenUsuario');
    this.decode = await jwt_decode(token);
    console.log(state.url);
    return this.service.permision(this.decode.usuario._id, state.url).then(res => {
      return Promise.resolve(true)
    }).catch(err => {
      setTimeout(() => {
        toastMixin.fire({
          icon: 'error',
          titleText: err.error.msg
        })
      }, 1000);
      return Promise.resolve(false)
    })

  }


}



const routes: Routes = [
  {
    path: "login", component: AuthComponent,
  },
  {
    path: "dashboard", component: DashboardComponent, data: { breadcrumb: 'Cafeteria', icono: 'fa fa-home', titulo: 'Cafeteria' }, children: [
      {
        path: '', component: MainComponent, canActivate: [getRol]
      },
      {
        path: 'usuario', component: UsuarioComponent, canActivate: [getRol]
      },
      {
        path: 'gestionRutas', component: GestionRutasComponent, canActivate: [getRol]
      },
      { path: "**", pathMatch: "full", redirectTo: "" }
    ]
  },
  { path: "**", pathMatch: "full", redirectTo: "login" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
