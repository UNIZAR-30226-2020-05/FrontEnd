import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {User, Amigo} from '../app.component';
import {error} from '@angular/compiler/src/util';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';

@Component({
  selector: 'app-panel-social',
  templateUrl: './panel-social.component.html',
  styleUrls: ['./panel-social.component.css']
})

export class PanelSocialComponent implements OnInit {



  editarUsuario = true;
  displayFlag: string;
  @Output() messageEvent = new EventEmitter<boolean>();

  listaVacia: boolean;
  mostarBusquedaAmigos: boolean;
  nickBusca: string;
  busqIniciada: boolean;
  noEncuentra: boolean;
  usuarioLogeado: User; // Quien está en la plataforma

  usuarioBuscado: User;

  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
  }

  ngOnInit(): void {
    this.listaVacia = true;
    this.mostarBusquedaAmigos = false;
    this.busqIniciada = false;
    //Recibe el objeto usuario, y actualiza cuando se cambia.
    this.Servicio.sharedMessage.subscribe(userRecibido => this.usuarioLogeado = userRecibido);

  }

  activarBusqueda() {
    this.mostarBusquedaAmigos = true;
  }

  cerrarBusqueda() {
    this.mostarBusquedaAmigos = false;
  }

  esAutoBusqueda() {
    return (this.usuarioBuscado.nick == this.usuarioLogeado.nick);
  }

  existeAmigo(nick: string) {
    for (const usu of this.usuarioLogeado.amigos) {
      if (usu.nick === this.usuarioBuscado.nick) {
          return true;
      }
    }
    return false;
  }


  /* --- Servicio de API --- */
  buscarAmigo() {
    const params = new HttpParams()
      .set('nick', this.nickBusca);

    this.http.get(this.Servicio.URL_API + '/user/get', {params})
      .subscribe(
        (resp: User) => {
          this.busqIniciada = true;
          this.noEncuentra = false;
          this.usuarioBuscado = resp;
          console.log(resp.nick);
        },
        (erroro: string) => {
          this.busqIniciada = true;
          this.noEncuentra = true;
        }
      );

  }


  /* --- Servicio de API --- */
  cargarUsuario(alias: string) {
    const params = new HttpParams()
      .set('nick', alias);

    this.http.get(this.Servicio.URL_API + '/user/get', {params})
      .subscribe(
        (resp: User) => {
          this.usuarioLogeado = resp;
          console.log(resp.nick);
        }
      );
  }

  /* --- Servicio de API --- */

  /* Utiliza el objeto usuario, que contiene el usuario objetivo a ser agregado */
  agregarAmigo() {
    this.http.patch(this.Servicio.URL_API + '/user/addAmigo/' + this.usuarioLogeado.id, this.usuarioBuscado.id)
      .subscribe((resp: User) => {
        //Actualiza el usuario logeado con el nuevo estado.
        this.Servicio.nextMessage(resp);
      });
  }

  quitarAmigo(id: number) {
    this.http.patch(this.Servicio.URL_API + '/user/deleteAmigo/' + this.usuarioLogeado.id, id)
      .subscribe((resp: User) => {
        //Actualiza el usuario logeado con el nuevo estado.
        this.Servicio.nextMessage(resp);
      });
  }

  enviarToEdit() {
    this.Servicio.nextMessageEdit(this.editarUsuario);
    this.Servicio.nextMessage3(!this.editarUsuario);
    //this.Servicio.nextMessageCentral(!this.editarUsuario);
  }

  mostrarLogin() {
    this.Servicio.nextMessage3(false); //Desactiva album
    this.Servicio.nextMessage2(false); //Activa album
  }

}
