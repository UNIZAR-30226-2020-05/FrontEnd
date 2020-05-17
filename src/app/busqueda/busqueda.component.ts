import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User, Cancion, Album, Artista, ListaCancion} from '../app.component';


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

  inicio: string;
  busquedaIniciadaLista: boolean;
  noEncuentraLista: boolean;
  listaEncontrada: ListaCancion;

  buscado: string;
  buscado1: string;

  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
  }

  ngOnInit(): void {
    this.mostrarBusqueda = false;
  }

  cancelarBusqueda() {
    this.mostrarBusqueda = false;
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
    }
  }
}
