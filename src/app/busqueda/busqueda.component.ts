import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User, Cancion, Album, Artista} from '../app.component';


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

  buscado: string;
  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) { }

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
          this.busquedaIniciadaCanc = true;
          this.noEncuentraCancion = true;
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
          this.busquedaIniciadaCanc = true;
          this.noEncuentraCancion = true;
        }
      );
  }
}
