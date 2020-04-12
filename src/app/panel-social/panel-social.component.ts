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
  @Output() messageEvent = new EventEmitter<boolean>();

  listaVacia: boolean;
  mostarBusquedaAmigos: boolean;
  nickBusca: string;
  busqIniciada: boolean;
  noEncuentra: boolean;
  usuarioLogeado: User;
  usuario: User;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listaVacia = false;
    this.mostarBusquedaAmigos = false;
    this.busqIniciada = false;
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

  agregarAmigo() {
    const params = new HttpParams()
      .set('id2', this.usuario.id.toString());

    this.http.patch(this.URL_API + '/user/addAmigo{id1}', {params})
      .subscribe((resp: User) => { this.usuario = resp; console.log(resp.nick); } );
  }

  sendMessageFather() {
    this.messageEvent.emit(this.editarUsuario);
  }

}
