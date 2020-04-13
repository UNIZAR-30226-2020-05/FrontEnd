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
  usuarioLogeado: User; // Objeto usuario de quien está en la plataforma
  usuario: User;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listaVacia = true;
    this.mostarBusquedaAmigos = false;
    this.busqIniciada = false;
    this.usuarioLogeado = new User();
    this.usuarioLogeado.id = 1;
    this.displayFlag = 'block';
    this.cargarUsuario('new');
  }

  cargarUsuario(alias: string){
    const params = new HttpParams()
      .set('nick', alias);

    this.http.get(this.URL_API + '/user/get', {params})
      .subscribe(
        (resp: User) => {  this.usuarioLogeado = resp; console.log(resp.nick); }
      );
  }

  activarBusqueda() {
    this.mostarBusquedaAmigos = true;
  }

  cerrarBusqueda() {
    this.mostarBusquedaAmigos = false;
  }

  buscarAmigo() {
    const params = new HttpParams()
      .set('nick', this.nickBusca);

    this.http.get(this.URL_API + '/user/get', {params})
      .subscribe(
        (resp: User) => { this.busqIniciada = true; this.noEncuentra = false; this.usuario = resp; console.log(resp.nick); },
        (erroro: string) => {this.busqIniciada = true; this.noEncuentra = true; }
      );


  }
  /* Utiliza el objeto usuario, que contiene el usuario objetivo a ser agregado */
  agregarAmigo() {
      this.http.patch(this.URL_API + '/user/addAmigo/' + this.usuario.id, this.usuarioLogeado.id )
      .subscribe((resp: User) => {
        this.usuarioLogeado.amigos.push(this.usuario); console.log(resp.nick);
      } );

      this.cargarUsuario(this.usuarioLogeado.nick);
      this.checkListaVacia();

  }

  sendMessageFather() {
    this.messageEvent.emit(this.editarUsuario);
  }


  checkListaVacia()  {
    this.listaVacia = (this.usuarioLogeado.amigos.length == 0);
  }

}
