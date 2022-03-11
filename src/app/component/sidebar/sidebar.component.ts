import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { SidebarModule } from 'ng-cdbangular';
import { ServiciosService } from 'src/app/servicios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  token: any;
  modulos = [];
  constructor(private _router: Router, private _service: ServiciosService) { }

  ngOnInit(): void {
    this.getModulos()
  }
  async getModulos() {
    this.token = jwtDecode(localStorage.getItem('tokenUsuario'));
    this._service.getModulo(this.token.usuario._id).then((res: any) => {
      this.modulos = res.cont.modulos;
    }).catch(err => {
      this.modulos = [];
    })
  }
  navigate(ruta) {
    console.log(ruta);

    this._router.navigate([ruta])
  }
}
