import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ServiciosService } from 'src/app/services/servicios.service';
import { environment } from 'src/environments/environment.prod';
import { Location } from '@angular/common'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  token: any;
  modulos = [];
  dropdown: Boolean = false;
  linkImg = `${environment.url}/imagen/usuario/8d0rgo2rwk3em4wpz.png`
  ruta: any;
  constructor(private _router: Router, private _service: ServiciosService, private _location: Location) { }

  ngOnInit(): void {
    this.getModulos()
  }
  async getModulos() {
    const rut = this._router.url.split('/');
    this.ruta = rut[rut.length - 1]
    this.token = jwtDecode(localStorage.getItem('tokenUsuario'));
    this.linkImg = `${environment.url}/imagen/usuario/${this.token.usuario.strImagen}`
    this._service.getModulo(this.token.usuario._id).then((res: any) => {
      this.modulos = res.cont.modulos;
    }).catch(err => {
      this.modulos = [];
    })
  }
  navigate(ruta) {
    const rut = ruta.split('/');
    this.ruta = rut[rut.length - 1];
    this._router.navigate([ruta])
  }
  changeDrop() {
    this.dropdown = !this.dropdown;
  }
}
