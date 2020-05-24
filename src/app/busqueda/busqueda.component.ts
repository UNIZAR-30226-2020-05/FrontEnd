import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User, Cancion, Album, Artista, ListaCancion, Podcast, ListaPodcast} from '../app.component';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  mostrarBusqueda: boolean;
// Busca cancion
  busquedaIniciadaCanc: boolean;
  noEncuentraCancion: boolean;
  cancionEncontrada: Array<Cancion>;
  numCancion: number;
  // Busca album
  busquedaIniciadaAlb: boolean;
  noEncuentraAlbum: boolean;
  albumEncontrado: Array<Album>;
  numAlbum: number;
  // Busca artista
  busquedaIniciadaArt: boolean;
  noEncuentraArtista: boolean;
  artistaEncontrado: Array<Artista>;
  numArtista: number;
  // Busca podcast
  busquedaIniciadaPod: boolean;
  noEncuentraPodcast: boolean;
  podcastEncontrado: Array<Podcast>;
  numPodcast: number;

  inicio: string;
  busquedaIniciadaLista: boolean;
  noEncuentraLista: boolean;
  listaEncontrada: ListaCancion;

  busquedaIniciadaListaP: boolean;
  noEncuentraListaP: boolean;
  listaPEncontrada: ListaPodcast;

  buscado: string;
  buscado1: string;

  usuarioLogeado: User; // Quien está en la plataforma
  vistaSelPod: boolean;
  podcastObjetivo: number;

  albumDeCancion: Album;


  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
  }

  ngOnInit(): void {
    this.mostrarBusqueda = false;
    this.Servicio.sharedMessage.subscribe(userRecibido => this.usuarioLogeado = userRecibido);
    this.Servicio.sharedMessageBusq.subscribe(messageBusq => this.mostrarBusqueda = messageBusq);

  }

  cancelarBusqueda() {
    this.mostrarBusqueda = false;
    this.Servicio.nextMessageCentral(true);

  }

  buscarContenido() {
    this.numCancion = 0;
    this.numAlbum = 0;
    this.numArtista = 0;
    this.busquedaIniciadaArt = false;
    this.busquedaIniciadaAlb = false;
    this.busquedaIniciadaCanc = false;
    this.busquedaIniciadaLista = false;
    this.noEncuentraLista = true;
    this.inicio = this.buscado.charAt(0);
    this.Servicio.nextMessageCentral(false);


    if (this.inicio != '#') {
      this.mostrarBusqueda = true;
      let params = new HttpParams().set('titulo', this.buscado);

      this.http.get(this.Servicio.URL_API + '/album/getByTitulo', {params})
        .subscribe(
          (resp: Array<Album>) => {
            this.busquedaIniciadaAlb = true;
            this.noEncuentraAlbum = false;
            this.numAlbum = resp.length;
            this.albumEncontrado = resp;
            console.log(resp);
          },
          (error: string) => {
            this.busquedaIniciadaAlb = true;
            this.noEncuentraAlbum = true;
          }
        );

      params = new HttpParams().set('name', this.buscado);


      this.http.get(this.Servicio.URL_API + '/song/getByName', {params})
        .subscribe(
          (resp: Array<Cancion>) => {
            this.busquedaIniciadaCanc = true;
            this.noEncuentraCancion = false;
            this.numCancion = resp.length;
            this.cancionEncontrada = resp;
            console.log(resp);
          },
          (error: string) => {
            this.busquedaIniciadaCanc = true;
            this.noEncuentraCancion = true;
          }
        );

      this.http.get(this.Servicio.URL_API + '/artist/getByName', {params})
        .subscribe(
          (resp: Array<Artista>) => {
            this.busquedaIniciadaArt = true;
            this.noEncuentraArtista = false;
            this.numArtista = resp.length;
            this.artistaEncontrado = resp;
            console.log(resp);
          },
          (error: string) => {
            this.busquedaIniciadaArt = true;
            this.noEncuentraArtista = true;
          }
        );

      this.http.get(this.Servicio.URL_API + '/podcast/getByName', {params})
        .subscribe(
          (resp: Array<Podcast>) => {
            this.busquedaIniciadaPod = true;
            this.noEncuentraPodcast = false;
            this.numPodcast = resp.length;
            this.podcastEncontrado = resp;
            console.log(resp);
          },
          (error: string) => {
            this.busquedaIniciadaPod = true;
            this.noEncuentraPodcast = true;
          }
        );
    } else {
      this.mostrarBusqueda = true;
      this.buscado1 = this.buscado.substr(1);
      const params = new HttpParams().set('id', this.buscado1);
      this.http.get(this.Servicio.URL_API + '/listaCancion/get', {params})
        .subscribe(
          (resp: ListaCancion) => {
            this.cancelarBusqueda();
            this.busquedaIniciadaLista = true;
            this.noEncuentraLista = false;
            this.listaEncontrada = resp;
            this.Servicio.nextMessageVistaLista(!this.noEncuentraLista);
            this.Servicio.nextMessageObjLista(this.listaEncontrada);
            this.Servicio.nextMessageFavList(false);
            this.Servicio.nextMessage3(false);
            console.log(resp);
          },
          (error: string) => {
            this.busquedaIniciadaLista = true;
            this.noEncuentraLista = true;
          }
        );

      if (this.noEncuentraLista == true) {
        this.http.get(this.Servicio.URL_API + '/listaPodcast/get', {params})
          .subscribe(
            (resp: ListaPodcast) => {
              this.cancelarBusqueda();
              this.busquedaIniciadaListaP = true;
              this.noEncuentraListaP = false;
              this.listaPEncontrada = resp;
              this.Servicio.nextMessageVistaPodcast(!this.noEncuentraListaP);
              this.Servicio.nextMessageObjPodcast(this.listaPEncontrada);
              this.Servicio.nextMessageFavListP(false);
              this.Servicio.nextMessage3(false);
              console.log(resp);
            },
            (error: string) => {
              this.busquedaIniciadaLista = true;
              this.noEncuentraLista = true;
            }
          );
      }
    }
  }
  anyadirAlista( id_lista: number, id_c: number) {

    this.http.patch(this.Servicio.URL_API + '/listaPodcast/add/' + id_lista, id_c).subscribe(
      (resp: string) => { console.log(resp); this.Servicio.nextMessage(this.usuarioLogeado); } );
  }
  pasarCaratula(nombre){
    this.Servicio.cargarAlbum(nombre);
    this.Servicio.albumActivo.subscribe(albumObj => {
      this.albumDeCancion = albumObj;
      this.Servicio.enviarAlbumPlay(this.albumDeCancion);
    });
  }
}
