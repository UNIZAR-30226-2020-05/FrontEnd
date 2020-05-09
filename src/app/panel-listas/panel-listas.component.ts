import {Component, Output,EventEmitter, OnInit} from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {ListaCancionRequest, User, ListaCancion, Cancion, Album} from "../app.component";
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
  cancion: Cancion;
  idLista: number;

  listaBorrar: ListaCancion;

  album: Album;
  caratula: string;


  constructor(private http: HttpClient,private Servicio: ServicioComponentesService) {
    /*this.album.caratula="";*/
  }

  ngOnInit(): void {
    this.Servicio.sharedMessage.subscribe(message => this.usuario=message);
    this.Servicio.sharedMessageVistaLista.subscribe(messageVistaLista => this.okVista=messageVistaLista);
    this.Servicio.sharedMessageObjLista.subscribe(messageObjLista => this.listaOk = messageObjLista);
    this.Servicio.cancionActiva.subscribe(cancionObj => this.cancion = cancionObj);
    this.Servicio.albumReprod.subscribe(albumCanActv => this.album= albumCanActv);
    this.Servicio.sharedMessageFavLista.subscribe(favLista => this.mostrarFav = favLista);
    this.Servicio.sharedMessageFavListaP.subscribe(favListaP => this.mostrarFavP = favListaP)
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
    this.http.get(this.Servicio.URL_API + '/listaCancion/get', {params}).subscribe( (resp: ListaCancion) =>
    {this.listaOk=resp; this.Servicio.nextMessageObjLista(this.listaOk);});

  }

  devuelveCaratula(){
    const params = new HttpParams()
      .set('titulo', this.cancion.album);

    this.http.get(this.Servicio.URL_API + '/album/getByTitulo', {params})
      .subscribe((album: Array<Album>) => {this.album=album[0]});
  }

  addFav(){

    this.http.patch(this.Servicio.URL_API + '/listaCancion/add' + this.usuario.lista_cancion[0].id, this.cancion.id).subscribe( (resp:string) =>
      console.log(resp)); //ver actualiazr lista vista de cancion
  }
}

