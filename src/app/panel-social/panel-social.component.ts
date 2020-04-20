import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {User} from '../app.component';
import {error} from '@angular/compiler/src/util';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';

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

  constructor(private http: HttpClient, private Servicio: ServicioComponentesService) {
  }

  ngOnInit(): void {
    this.listaVacia = true;
    this.mostarBusquedaAmigos = false;
    this.busqIniciada = false;
    //Recibe el objeto usuario, y actualiza cuando se cambia.
    this.Servicio.sharedMessage.subscribe(message => this.usuarioLogeado = message);
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

  enviarToEdit() {
    this.Servicio.nextMessageEdit(this.editarUsuario);
    this.Servicio.nextMessage3(!this.editarUsuario);
  }
  
}
