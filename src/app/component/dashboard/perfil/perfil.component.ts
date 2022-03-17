import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  token: any;
  linkImg: string;
  permisos = [];
  constructor(private _service: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.token = jwtDecode(localStorage.getItem('tokenUsuario'));
    this.linkImg = `${environment.url}/imagen/usuario/${this.token.usuario.strImagen}`
    this._service.getModulo(this.token.usuario._id).then((res: any) => {
      this.permisos = res.cont.modulos;
    }).catch(err => {
      this.permisos = [];
    })
  }
  logOut() {
    localStorage.removeItem('tokenUsuario')
    this._router.navigate(['/'])
  }

}
