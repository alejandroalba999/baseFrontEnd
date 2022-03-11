import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private navigation: Router) { }

  ngOnInit(): void {
  }
  salir() {
    this.navigation.navigate(['/'])
  }
}
