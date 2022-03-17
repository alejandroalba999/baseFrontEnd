import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

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
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  registroComponent = false;
  cargando = false;
  loginModel = new LoginModel();
  constructor(private _service: ServiciosService, private navigation: Router) { }

  ngOnInit(): void {
  }

  async Logear() {
    this.cargando = true;
    this._service.login(this.loginModel).then((res: any) => {
      this.cargando = false;
      toastMixin.fire({
        icon: 'success',
        title: `!Bienvenido ${res.usuario.strNombre}¡`,
      });
      localStorage.setItem('tokenUsuario', res.token);
      this.navigation.navigate(['/dashboard'])
    }).catch(err => {
      console.log(err.name);

      this.cargando = false;
      toastMixin.fire({
        icon: 'error',
        title: `${err.name == 'HttpErrorResponse' ? 'Error del servidor' : err.error ? err.error.err.message : err.error}`,
      });
    })

  }
}
