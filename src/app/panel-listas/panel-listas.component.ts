import {Component, Output,EventEmitter, OnInit} from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {
  ListaCancionRequest,
  User,
  ListaCancion,
  Cancion,
  Album,
  ListaPodcastRequest,
  ListaPodcast
} from "../app.component";
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';
import {subscribeToResult} from "rxjs/internal-compatibility";


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
  okVistaPodcast:boolean=true;

  usuario: User;
  nombreLista: string;
  nombreListaPodcast: string;

  listaOk: ListaCancion;
  listaOkPodcast: ListaPodcast;

  cancion: Cancion;
  idLista: number;

  listaBorrar: ListaCancion;

  album: Album = new Album();
  albAct:Album= new Album();

  listaFav:ListaCancion;
  listaFavPodcast:ListaPodcast;
  listasUser;
  listasUserPodcast;

  porFecha:boolean=false;
  porArtista:boolean=false;
  porNombre:boolean=false;
  listaOrdenada: Array<Cancion>;

  enFav:boolean;
  noEnFav:boolean;


  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
    this.album.caratula="https://i.dlpng.com/static/png/6331252_preview.png";

  }

  ngOnInit(): void {
    this.Servicio.sharedMessage.subscribe(message => {
      if(message != null){this.usuario=message; this.listaFav=this.usuario.lista_cancion[0];this.listasUser=this.usuario.lista_cancion;
      this.listaFavPodcast= this.usuario.lista_podcast[0];this.listasUserPodcast=this.usuario.lista_podcast}
    });
    this.Servicio.sharedMessageVistaLista.subscribe(messageVistaLista => this.okVista=messageVistaLista);
    this.Servicio.sharedMessageObjLista.subscribe(messageObjLista => this.listaOk = messageObjLista);
    this.Servicio.sharedMessageVistaPodcast.subscribe(messageVistaPodcast => this.okVistaPodcast=messageVistaPodcast);
    this.Servicio.sharedMessageObjPodcast.subscribe(messageObjPodcast => this.listaOkPodcast = messageObjPodcast);

    this.Servicio.canActiva.subscribe((cancionObj) => this.cancion = cancionObj);
    this.Servicio.albumReprod.subscribe((albumCanActv) => {
      if (albumCanActv != null) { (this.album = albumCanActv); }
    });
    this.Servicio.sharedMessageFavLista.subscribe(favLista => this.mostrarFav = favLista);
    this.Servicio.sharedMessageFavListaP.subscribe(favListaP => this.mostrarFavP = favListaP);
    this.Servicio.albumActivo.subscribe(album => this.albAct=album);
    this.Servicio.sharedMessageBorrarLista.subscribe(lista => this.usuario.lista_cancion=lista);

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

  nuevaListaPodcast(){
    const lista: ListaPodcastRequest = {
      id_usuario: this.usuario.id,
      nombre: this.nombreListaPodcast,
    };

    this.http.post(this.Servicio.URL_API + '/listaPodcast/create', lista).subscribe(
      (resp: ListaPodcast) => { console.log(resp); this.usuario.lista_podcast.push(resp)});

  }

  listaPulsada(id: number){
    const param = id.toString();
    const params = new HttpParams().set('id', param);
    this.http.get(this.Servicio.URL_API + '/listaCancion/get', {params}).subscribe( (resp: ListaCancion) =>
    {this.listaOk=resp; this.Servicio.nextMessageObjLista(this.listaOk);});

  }
  listaPulsadaPodcast(id: number){
    const param = id.toString();
    const params = new HttpParams().set('id', param);
    this.http.get(this.Servicio.URL_API + '/listaPodcast/get', {params}).subscribe( (resp: ListaPodcast) =>
    {this.listaOkPodcast=resp; this.Servicio.nextMessageObjPodcast(this.listaOkPodcast);});

  }

  addFav(id_lista:number,id_cancion: number){

    this.http.patch(this.Servicio.URL_API + '/listaCancion/add/' + id_lista, id_cancion).subscribe( (resp:ListaCancion) =>{
    console.log(resp);this.listaFav=resp});
  }

  sacarTiempo(n: number) {
    let s = '';
    let auxMin; let auxSeg;
    auxMin = Math.floor(n / 60);
    auxSeg = Math.floor(n % 60);
    if (auxMin < 10) { s += '0'; }
    s += auxMin.toString() + ':';
    if (auxSeg < 10) { s += '0'; }
    s += auxSeg.toString();
    return s;
  }
  reproducir(lista){
    this.Servicio.reproducirLista(lista);
  }

  borrarCancion(cancion:number){
    this.http.patch(this.Servicio.URL_API + '/listaCancion/deleteSong/' + this.listaFav.id, cancion).subscribe((resp:ListaCancion) =>
    {console.log(resp); this.listaFav=resp});

  }

  comprobarSienFav(cancion:number){
    this.http.patch(this.Servicio.URL_API + '/listaCancion/add/' + this.listaFav.id, cancion).subscribe(
      (lista:ListaCancion) => {if(lista.nombre=='Favoritos'){this.enFav=true} else{this.noEnFav=true}});
  }

  borrarPodcast(podcast:number){
    this.http.patch(this.Servicio.URL_API + '/listaPodcast/deletePodcast/' + this.listaFavPodcast.id, podcast).subscribe((resp:ListaPodcast) =>
    {console.log(resp); this.listaFavPodcast=resp});

  }

  ordenarFecha(){
    this.listaOrdenada=this.listaFav.canciones;
   this.listaOrdenada=this.listaOrdenada.reverse();

  }
}
