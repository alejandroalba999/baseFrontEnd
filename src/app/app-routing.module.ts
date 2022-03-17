import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthComponent } from './component/auth/auth.component';
import { UsuarioComponent } from './component/dashboard/usuario/usuario.component';
import { ServiciosService } from './services/servicios.service';
import Swal from 'sweetalert2';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MainComponent } from './component/dashboard/main/main.component';
import { GestionRutasComponent } from './component/dashboard/gestion-rutas/gestion-rutas.component';
import { PerfilComponent } from './component/dashboard/perfil/perfil.component';
import { ProductoComponent } from './component/dashboard/producto/producto.component';
import { GestionRolComponent } from './component/dashboard/gestion-rol/gestion-rol.component';

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
    try {
      const token = localStorage.getItem('tokenUsuario');
      this.decode = await jwt_decode(token);
      return this.service.permision(this.decode.usuario._id, state.url).then(res => {
        return Promise.resolve(true)
      }).catch(err => {
        setTimeout(() => {
          toastMixin.fire({
            icon: 'error',
            titleText: err.error.msg
          })
        }, 1000);
        this.route.navigate(['/'])
        return Promise.resolve(false)
      })
    } catch (error) {
      setTimeout(() => {
        toastMixin.fire({
          icon: 'error',
          titleText: 'No cuenta con permisos para acceder a la ruta ' + state.url
        })
      }, 1000);
      this.route.navigate(['/'])
      Promise.resolve(false)
    }
  }


}



const routes: Routes = [
  {
    path: "login", component: AuthComponent,
  },
  {
    path: "dashboard", component: DashboardComponent, children: [
      {
        path: '', component: MainComponent, canActivate: [getRol]
      },
      {
        path: 'usuario', component: UsuarioComponent, canActivate: [getRol],
      },
      {
        path: 'perfil', component: PerfilComponent, canActivate: [getRol]
      },
      {
        path: 'gestionRutas', component: GestionRutasComponent, canActivate: [getRol]
      },
      {
        path: 'gestionRol', component: GestionRolComponent, canActivate: [getRol]
      },
      {
        path: 'producto', component: ProductoComponent, canActivate: [getRol]
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
