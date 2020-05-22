import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {User} from '../app.component';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  @Input() mostrar; // Muestra la pantalla de cambio de contraseña
  public aBorrar; // Muestra la pantalla de confirmación de eliminación de cuenta
  public passCambiada; // Muestra el mensaje de información de cambio de password
  public imageCambiada;
  public algoCambia;
  public imageSeleccion = 0;
  public login: true;

  @Output() messageEvent = new EventEmitter<boolean>();

  usuarioLog: User;
  // Atributo a cambiar
  passN: string;
  passN2: string;
  id: number;
  constructor(private http: HttpClient, private Servicio: ServicioComponentesService) {
    this.passN = '';
    this.passN2 = '';

  }
  // Se muestra al pulsar en el engranaje de panel social
  receiveMessageChild($event) {
    this.mostrar = ($event);
  }
  // Cancelar
  cancelarEdit() {
    this.mostrar = false;
    this.aBorrar = false;
    this.passCambiada = false;
    this.imageCambiada = false;
    this.algoCambia = false;
    this.Servicio.nextMessageCentral(true);

    // this.Servicio.sharedMessageCentral.subscribe(messageCentral => this.mostrar = messageCentral);
  }
  // Para mostrar la pantalla de borrado de usuario
  borrarUsuario() {
    this.mostrar = false;
    this.aBorrar = true;
  }
  // Cancela el borrado
  cancelaBorrado() {
    this.mostrar = true;
    this.aBorrar = false;
  }

  // Borra el usuario y vuelve a la pantalla de login
  confirmaBorrado() {
    this.id = this.usuarioLog.id;
    this.http.delete(this.Servicio.URL_API + '/user/delete/' + this.id).subscribe(
      (resp: string) => { console.log(resp); } );
    this.Servicio.nextMessage2(false);
    this.mostrar = false;
    this.aBorrar = false;
  }
  // Comprueba que la contraseña se haya repetido correctamente
  contrasenaBien() {
    return (this.passN !== '' && this.passN2 !== '' && this.passN === this.passN2);
  }
  // Cambia la contraseña del usuario
  cambio() {
    if (this.contrasenaBien()) {
      this.id = this.usuarioLog.id;
      this.http.patch(this.Servicio.URL_API + '/user/modifyPass/' + this.id, btoa(this.passN)).subscribe(
        (resp: string) => { console.log(resp); } );
      this.passCambiada = true;
    }
    if (this.imageSeleccion != 0) {
      this.http.patch(this.Servicio.URL_API + '/user/setAvatar/' + this.usuarioLog.id, this.imageSeleccion + '.jpg').subscribe(
        (resp: string) => { console.log(resp);
          this.Servicio.nextMessage(resp);
        } );
      this.imageCambiada = true;
    }
    this.algoCambia = true;
    this.mostrar = false;

  }
  // Cambia a la pantalla de información de cambio de contraseña
  finalCambio() {
    this.passCambiada = false;
    this.imageCambiada = false;
    this.algoCambia = false;
    this.imageSeleccion = 0;
    this.Servicio.nextMessageCentral(true);
  }

  ngOnInit(): void {
    this.aBorrar = false;
    this.passCambiada = false;
    this.Servicio.sharedMessageEdit.subscribe(messageEdit => this.mostrar = messageEdit);
    this.Servicio.sharedMessage.subscribe(message => this.usuarioLog = message);
  }
}
