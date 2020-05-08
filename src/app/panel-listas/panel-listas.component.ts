import {Component, Output,EventEmitter, OnInit} from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {ListaCancionRequest, User, ListaCancion} from "../app.component";
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-panel-listas',
  templateUrl: './panel-listas.component.html',
  styleUrls: ['./panel-listas.component.css']
})
export class PanelListasComponent implements OnInit {

  mostrarCrearP:boolean=false;
  mostrarCrearC:boolean=false;

  mostrarFav:boolean=false; //variable de canciones
  mostrarFavP: boolean=false; //variable de podcasts

  okVista:boolean=true;

  usuario: User;
  nombreLista: string;
  listaOk: ListaCancion;
  cancion: ListaCancion;
  idLista: number;

  listaBorrar: ListaCancion;


  constructor(private http: HttpClient,private Servicio: ServicioComponentesService) { }

  ngOnInit(): void {
    this.Servicio.sharedMessage.subscribe(message => this.usuario=message);
    this.Servicio.sharedMessageVistaLista.subscribe(messageVistaLista => this.okVista=messageVistaLista);
    this.Servicio.sharedMessageObjLista.subscribe(messageObjLista => this.listaOk = messageObjLista);
  }
  newMessage() {
    this.Servicio.nextMessage(this.usuario);
  }

  enviarToVistaLista(){
    this.Servicio.nextMessageVistaLista(!this.okVista);
  }


  nuevaListaCanciones(){
    const lista: ListaCancionRequest = {
      id_usuario: this.usuario.id,
      nombre: this.nombreLista,
    };

    this.http.post(this.Servicio.URL_API + '/listaCancion/create', lista).subscribe(
      (resp: ListaCancion) => { console.log(resp); this.usuario.lista_cancion.push(resp)});


  }

  listaPulsada(id: number){
    const param = id.toString();
    const params = new HttpParams().set('id', param);
    this.http.get(this.Servicio.URL_API + '/listaCancion/get', {params}).subscribe( (resp: ListaCancion) => {this.listaOk=resp; this.Servicio.nextMessageObjLista(this.listaOk);});

  }

}

