import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {User} from '../app.component';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-panel-social',
  templateUrl: './panel-social.component.html',
  styleUrls: ['./panel-social.component.css']
})

export class PanelSocialComponent implements OnInit {

  public URL_API = 'http://localhost:8080';


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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.cargarUsuario('new');
    this.listaVacia = true;
    this.mostarBusquedaAmigos = false;
    this.busqIniciada = false;
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
    /*let aux;
      this.http.get(this.URL_API + '/user/get', nick})
        .subscribe(
          (resp: User) => {
            let aux = resp; console.log(resp.nick);
          }
        );

      let str = this.usuarioBuscado;
      return this.usuarioLogeado.amigos.filter(function(usuarioLogeado) {
        return usuarioLogeado.nick === str;
      });*/
    return this.usuarioLogeado.amigos.includes(this.usuarioBuscado);
  }


  /* --- Servicio de API --- */
  buscarAmigo() {
    const params = new HttpParams()
      .set('nick', this.nickBusca);

    this.http.get(this.URL_API + '/user/get', {params})
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

    this.http.get(this.URL_API + '/user/get', {params})
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
    this.http.patch(this.URL_API + '/user/addAmigo/' + this.usuarioBuscado.id, this.usuarioLogeado.id)
      .subscribe((resp: User) => {
        this.usuarioLogeado.amigos.push(this.usuarioBuscado);
        console.log(resp.nick);
      });
  }

  sendMessageFather() {
    this.messageEvent.emit(this.editarUsuario);
  }
}
