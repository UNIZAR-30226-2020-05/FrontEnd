import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {User, Amigo, Cancion, Album} from '../app.component';
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
  listaCan: Array<Cancion>;

  cancionAmigoActual: Cancion;

  okVistaUsuario:boolean=true;

  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
  }

  ngOnInit(): void {
    this.listaVacia = true;
    this.mostarBusquedaAmigos = false;
    this.busqIniciada = false;
    //Recibe el objeto usuario, y actualiza cuando se cambia.
    this.Servicio.sharedMessage.subscribe(userRecibido => this.usuarioLogeado = userRecibido);
    this.cargarCanciones();
    this.Servicio.sharedMessageVistaUsuario.subscribe(okVista => this.okVistaUsuario = okVista);
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
  cargarCanciones() {

    const params = new HttpParams().set('name', '');
    this.http.get(this.Servicio.URL_API + '/song/getByName', {params})
      .subscribe(
        (resp: Array<Cancion>) => {
          this.listaCan = resp;
        }
      );

  }

  /* --- Servicio de API --- */

  obtenerCancion(id: number) {

    let encontrado = false;
    for (const cancionc of this.listaCan) {
      if (!encontrado) {
        if (id === cancionc.id) {
          this.cancionAmigoActual = cancionc;
          encontrado = true;
        }
      }
    }
  }

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

  mostrarLogin() { // Gestionar TODOS los casos que pueden pasar.
    this.Servicio.nextMessage3(false); // Desactiva album
    this.Servicio.nextMessageVistaLista(false); // Desactiva vista de playlist.
    this.Servicio.activarVistaUsuario(false); // Desactiva vista usuarios.
    this.Servicio.nextMessageArtista(false); // Desactiva vista artista.
    this.Servicio.nextMessage2(false); // Activa login
  }

  esCancion(nombre: string) {
    for (const can of this.listaCan) {
      if (can.name === nombre) {
        return true;
      }
    }
    return false;
  }

  obtenerNombreUltCancion(am: Amigo) {
    if (am.ultimaCancion !== '') {
      return am.ultimaCancion;
    }
    else {
      return 'Ultima canción';
    }
  }

  obtenerNombreUltArista(am: Amigo) {
    if (am.artistaUltimaCancion !== '') {
      return am.artistaUltimaCancion;
    }
    else {
      return 'Ultimo artista';
    }
  }
}
