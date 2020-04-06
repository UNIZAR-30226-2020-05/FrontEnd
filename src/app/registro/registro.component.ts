import {Component, OnInit, Input, Output} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {User, UserRequest} from '../app.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @Input() registro1; //Flag si se solicita proceso de registro
  public registro2; //Flag si está en el paso dos de registro.
  public registro3; //Flag si está en el paso tres de registro.

  public aceptadoT;
  public imageSeleccion;

  // Campos registro:
  alias: string;
  nombre: string;
  apellidos: string;
  fecha_nac: string;
  pass: string;
  pass2: string;

  constructor(private http: HttpClient) {
    this.alias = '';
    this.nombre = '';
    this.apellidos = '';
    this.fecha_nac = '';
    this.pass = '';
    this.pass2 = '';
  }

  ngOnInit(): void {
    this.registro1 = false;
    this.registro2 = false;
    this.registro3 = false;
    this.aceptadoT = false;
    this.imageSeleccion = 0;

  }

  receiveMessageChild($event) {
    this.registro1 = ($event);
  }

  regFase2() {
    this.registro1 = false;
    this.registro2 = true;
    this.registro3 = false;
  }

  regFase3() {
    this.registro1 = false;
    this.registro2 = false;
    this.registro3 = true;
  }

  registrado() {
    this.registro1 = false;
    this.registro2 = false;
    this.registro3 = false;

    const nuevo: UserRequest = { // Objeto usuario en registro
      nick: this.alias, // Nickname
      contrasena: this.pass, // Contrasena
      tipo_user: true, // false = usuario, true = admin
      fecha_nacimiento: this.fecha_nac // String de fecha nacim.
    };

    // Test esto:
    this.http.post('http://localhost:8080/user/create', nuevo).subscribe(
      (resp: string) => { console.log(resp); } );
  }

  /* Función para comprobar si los datos del formulario son adecuados */
   datosok() {
    return (this.alias !== '' && this.nombre !== '' && this.apellidos !== '' &&
            this.fecha_nac !== '' && this.pass !== '' && this.pass2 !== '' &&
            this.pass === this.pass2);
  }

  alternarAceptado() {
    if (this.aceptadoT) { this.aceptadoT = false;}
    else this.aceptadoT = true;
  }
}
