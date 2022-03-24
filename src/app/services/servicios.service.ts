import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const endPoint = environment.url
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }

  login(body) {

    return this.http.post(`${endPoint}/login`, body).toPromise();
  }
  permision(idUsuario, strUrl) {
    return this.http.post(`${endPoint}/auth/permisos`, { idUsuario, strUrl }).toPromise()
  }
  getModulo(idUsuario) {
    return this.http.post(`${endPoint}/auth/permisos/modulos`, { idUsuario }).toPromise()
  }

}
