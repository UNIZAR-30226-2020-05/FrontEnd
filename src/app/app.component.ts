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
  nick: string;
  contrasena: string;
  tipo_user: boolean;
  fecha_nacimiento: string;
  id_ultima_reproduccion: number;
  minuto_ultima_reproduccion: number;
  tipo_ultima_reproduccion: number;
}

export class UserRequest {
  nick: string;
  contrasena: string;
  tipo_user: boolean;
  fecha_nacimiento: string;
}
