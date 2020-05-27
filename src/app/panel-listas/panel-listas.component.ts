import {Component, Output,EventEmitter, OnInit} from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {
  ListaCancionRequest,
  User,
  ListaCancion,
  Cancion,
  Album,
  ListaPodcastRequest,
  ListaPodcast, Artista
} from '../app.component';
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';
import {subscribeToResult} from "rxjs/internal-compatibility";
import {NumberFormatStyle} from "@angular/common";


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
  idListaBorrada: number;
  numListasBorradas: number;

  listaBorrar: ListaCancion;

  album: Album = new Album();
  albAct:Album= new Album();

  listaFav:ListaCancion;
  listaFavPodcast:ListaPodcast;
  listasUser;
  listasUserPodcast;

  listaMantener: Array<Cancion> =new Array<Cancion>();
  listaMantener2: ListaPodcast = new ListaPodcast();

  enFav:boolean=false;
  enFavC:boolean=false;


  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
    this.album.caratula="/imagenes/albums/album_default.png";

  }

  ngOnInit(): void {
    this.Servicio.sharedMessage.subscribe(message => {
      if(message != null){this.usuario=message;
      this.listaFav=this.usuario.lista_cancion[0];
      this.listasUser=this.usuario.lista_cancion;
      this.listaFavPodcast= this.usuario.lista_podcast[0];
      this.listasUserPodcast=this.usuario.lista_podcast}
    });
    this.Servicio.sharedMessageVistaLista.subscribe(messageVistaLista => this.okVista = messageVistaLista);
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
    this.Servicio.sharedMessageBorrarLista.subscribe(lista => this.listasUserPodcast = lista);
    this.Servicio.sharedMessageidList.subscribe(lista => this.idListaBorrada = lista);
    this.Servicio.sharedMessageComprobar.subscribe(esta => this.enFav= esta);
    this.Servicio.sharedMessageComprobarC.subscribe(estaC => this.enFavC= estaC);

  }
  newMessage() {
    this.Servicio.nextMessage(this.usuario);
  }

  enviarToVistaLista(){
    this.Servicio.nextMessageVistaLista(true);
    this.Servicio.nextMessageCentral(!this.okVista);
    this.Servicio.nextMessageVistaPodcast(false);
  }


  nuevaListaCanciones(){
    if (this.nombreLista.length != 0) {
      const lista: ListaCancionRequest = {
        id_usuario: this.usuario.id,
        nombre: this.nombreLista,
      };

      this.http.post(this.Servicio.URL_API + '/listaCancion/create', lista).subscribe(
          (resp: ListaCancion) => {
            console.log(resp);
            this.usuario.lista_cancion.push(resp)
          });
      this.nombreLista=null;
    }
  }

  nuevaListaPodcast(){
    if ( this.nombreListaPodcast.length != 0) {
      const lista: ListaPodcastRequest = {
        id_usuario: this.usuario.id,
        nombre: this.nombreListaPodcast,
      };

      this.http.post(this.Servicio.URL_API + '/listaPodcast/create', lista).subscribe(
          (resp: ListaPodcast) => {
            console.log(resp);
            this.usuario.lista_podcast.push(resp)
          });
      this.nombreListaPodcast=null;
    }
  }

  listaPulsada(id: number){
    const param = id.toString();
    const params = new HttpParams().set('id', param);
    this.http.get(this.Servicio.URL_API + '/listaCancion/get', {params}).subscribe( (resp: ListaCancion) =>
    {this.listaOk=resp; this.Servicio.nextMessageObjLista(this.listaOk);
    if(this.listaOk.canciones.length>0){this.Servicio.obtenerAlbum(this.listaOk.canciones[0].album)}});

  }
  listaPulsadaPodcast(id: number){
    const param = id.toString();
    const params = new HttpParams().set('id', param);
    this.http.get(this.Servicio.URL_API + '/listaPodcast/get', {params}).subscribe( (resp: ListaPodcast) =>
    {this.listaOkPodcast=resp; this.Servicio.nextMessageObjPodcast(this.listaOkPodcast);});

  }

  addFav(id_lista:number,id_cancion: number){

    this.http.patch(this.Servicio.URL_API + '/listaCancion/add/' + id_lista, id_cancion).subscribe( (resp:ListaCancion) =>{
    console.log(resp);this.listaFav=resp;this.enFavC=true;this.usuario.lista_cancion[0]=resp;this.Servicio.nextMessage(this.usuario)});
  }

  addFavPodcast(id_lista:number,id_cancion: number){

    this.http.patch(this.Servicio.URL_API + '/listaPodcast/add/' + id_lista, id_cancion).subscribe( (resp:ListaPodcast) =>{
      console.log(resp);this.listaFavPodcast=resp;this.enFav=true;this.usuario.lista_podcast[0]=resp;this.Servicio.nextMessage(this.usuario)});
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
    this.Servicio.reproducirListaPodcast(lista);
  }
  reproducirListaCanciones(lista){
    this.Servicio.reproducirLista(lista);
  }

  borrarCancion(cancion:number){
    this.http.patch(this.Servicio.URL_API + '/listaCancion/deleteSong/' + this.listaFav.id, cancion).subscribe((resp:ListaCancion) =>
    {console.log(resp); this.listaFav=resp;
    if(cancion == this.cancion.id){this.enFavC=false}this.usuario.lista_cancion[0]=resp;this.Servicio.nextMessage(this.usuario)});

  }


  borrarPodcast(podcast:number){
    this.http.patch(this.Servicio.URL_API + '/listaPodcast/deletePodcast/' + this.listaFavPodcast.id, podcast).subscribe((resp:ListaPodcast) =>
    {console.log(resp); this.listaFavPodcast=resp;
    if(podcast == this.cancion.id){this.enFav=false}this.usuario.lista_podcast[0]=resp;this.Servicio.nextMessage(this.usuario)});

  }
  ordenarFecha(){
    this.listaFav.canciones=this.listaFav.canciones.reverse();

  }
  ordenarArtista(){

    this.listaFav.canciones.sort((a, b) => {
      if (a.artistas < b.artistas) return -1;
      else if (a.artistas > b.artistas) return 1;
      else return 0;
    });
  }

  ordenarPorNombre(){
    this.listaFav.canciones.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  }
  ordenarFechaP(){
    this.listaFavPodcast.podcasts=this.listaFavPodcast.podcasts.reverse();

  }



  ordenarArtistaP(){

    this.listaFavPodcast.podcasts.sort((a, b) => {
      if (a.artista < b.artista) return -1;
      else if (a.artista > b.artista) return 1;
      else return 0;
    });
  }

  ordenarPorNombreP(){
    this.listaFavPodcast.podcasts.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  }
  cargarCaratula(cancion){
    const params = new HttpParams()
      .set('titulo', cancion);

    this.http.get(this.Servicio.URL_API + '/album/getByTitulo', {params})
      .subscribe(
        (album: Array<Album>) => {
          // Manda dibujar la caratula del album recibido
          this.Servicio.enviarAlbumPlay(album[0]);
        },
        (erroro: string) => { console.log(erroro);
        }
      );
  }

  cargarArtista(art: string) {
    const params = new HttpParams().set('name', art);
    this.http.get(this.Servicio.URL_API + '/artist/getByName', {params})
      .subscribe(
        (resp: Array<Artista>) => {
          this.Servicio.cargarAlbumesArtista(resp[0].id);
          this.Servicio.cargarArtista(art);
          this.mostrarVistaArtista()
        },
        (erroro: string) => {
        }
      );
  }

  mostrarVistaArtista() { // Gestionar TODOS los casos que pueden pasar.
    this.Servicio.nextMessage3(false); // Desactiva album
    this.Servicio.nextMessageVistaLista(false); // Desactiva vista de playlist.
    this.Servicio.activarVistaUsuario(false); // Desactiva vista usuarios.
    this.Servicio.nextMessageArtista(true); // Activa vista artista.
    this.Servicio.nextMessageCentral(false); // Desactiva central
    this.Servicio.nextMessageFavList(false);
    this.Servicio.nextMessageEdit(false);
    this.Servicio.nextMessageEdit2(false);
    this.Servicio.nextMessageBusq(false);
    this.Servicio.nextMessageFavListP(false);
    this.Servicio.nextMessageVistaLista(false);
    this.Servicio.nextMessageVistaPodcast(false);
  }

  mostrarVistaAlbum() { // Gestionar TODOS los casos que pueden pasar.
    this.Servicio.nextMessage3(true); // Activa album
    this.Servicio.nextMessageVistaLista(false); // Desactiva vista de playlist.
    this.Servicio.activarVistaUsuario(false); // Desactiva vista usuarios.
    this.Servicio.nextMessageArtista(false); // Desactiva vista artista.
    this.Servicio.nextMessageCentral(false); // Desactiva central
    this.Servicio.nextMessageFavList(false);
    this.Servicio.nextMessageFavListP(false);
    this.Servicio.nextMessageVistaLista(false);
    this.Servicio.nextMessageVistaPodcast(false);
    this.Servicio.nextMessageEdit(false);
    this.Servicio.nextMessageEdit2(false);
    this.Servicio.nextMessageBusq(false);
  }


}
