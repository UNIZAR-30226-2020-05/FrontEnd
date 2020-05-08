import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Album, ListaCancion, User} from '../app.component';


@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.css']
})
export class CentralComponent implements OnInit {
  mostrar = true;
  usuarioLogeado: User; // Quien está en la plataforma
  numPlaylist: number;
  recomendaciones: Array<Album>;

  okVista:boolean = true;
  listaOk: ListaCancion;



  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) { }

  ngOnInit(): void {
    this.mostrar = true;
    this.Servicio.sharedMessage.subscribe(userRecibido => this.usuarioLogeado = userRecibido);
    //this.Servicio.sharedMessageCentral.subscribe(messageCentral => this.mostrar = messageCentral);
    let params = new HttpParams().set('titulo', '');

    this.http.get(this.Servicio.URL_API + '/album/getByTitulo', {params})
      .subscribe(
        (resp: Array<Album>) => {
          this.recomendaciones = resp;
          console.log(resp);
        }
      );
    //this.numPlaylist = this.usuarioLogeado.lista_cancion.length;
  this.numPlaylist = 1;
  }

  enviarToVistaLista() {
    this.Servicio.nextMessageVistaLista(this.okVista);
  }

  listaPulsada(id: number) {
    const param = id.toString();
    const params = new HttpParams().set('id', param);
    this.http.get(this.Servicio.URL_API + '/listaCancion/get', {params}).subscribe( (resp: ListaCancion) => {this.listaOk=resp; this.Servicio.nextMessageObjLista(this.listaOk);});

  }

}
