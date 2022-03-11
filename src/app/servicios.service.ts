import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const endPoint = 'http://localhost:3000/api'
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }
  getCafeteria() {
    return this.http.get(`${endPoint}/cafeteria`,).toPromise();
  }
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
