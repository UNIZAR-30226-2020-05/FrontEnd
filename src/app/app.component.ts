import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
}

export class User {
  id: number;
  nombre: string;
  apellidos: string;
  nick: string;
  contrasena: string;
  tipo_user: boolean;
  fecha_nacimiento: string;
  id_ultima_reproduccion: number;
  minuto_ultima_reproduccion: number;
  tipo_ultima_reproduccion: number;

  lista_cancion: Array<ListaCancionRequest>;
  amigos: Array<User>;


  constructor() {
  this.amigos = new Array<User>();
  this.lista_cancion = new Array<ListaCancionRequest>();
  }

}

export class UserRequest {
  nombre: string;
  apellidos: string;
  nick: string;
  contrasena: string;
  tipo_user: boolean;
  fecha_nacimiento: string;
}

export class ListaCancionRequest {
  id_user: number;
  nombre: string;
}
