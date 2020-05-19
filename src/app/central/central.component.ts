import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Album, Artista, ListaCancion, Podcast, User} from '../app.component';


@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.css']
})
export class CentralComponent implements OnInit {
  mostrar = true;
  usuarioLogeado: User; // Quien está en la plataforma
  recomendaciones: Array<Album>;
  recomendacionesP: Array<Podcast>;

  vistaSelPod: boolean;
  podcastObjetivo: number;
  okVista = true;

  elArtista: Artista;



  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) { }

  ngOnInit(): void {
    this.mostrar = true;
    let params = new HttpParams().set('titulo', '');

    this.http.get(this.Servicio.URL_API + '/album/getByTitulo', {params})
      .subscribe(
        (resp: Array<Album>) => {
          this.recomendaciones = resp;
          console.log(resp);
        }
      );
    params = new HttpParams().set('name', '');
    this.http.get(this.Servicio.URL_API + '/podcast/getByName', {params})
      .subscribe(
        (resp: Array<Podcast>) => {
          this.recomendacionesP = resp;
          console.log(resp);
        }
      );
    this.Servicio.sharedMessage.subscribe(userRecibido => this.usuarioLogeado = userRecibido);
  }

  anyadirAlista( id_lista: number, id_c: number) {

    this.http.patch(this.Servicio.URL_API + '/listaPodcast/add/' + id_lista, id_c).subscribe(
      (resp: string) => { console.log(resp); this.Servicio.nextMessage(this.usuarioLogeado); } );
  }
  obtenerArtista(name) {
    const params = new HttpParams().set('name', name);
    this.http.get(this.Servicio.URL_API + '/artist/getByName', {params})
      .subscribe(
        (resp: Array<Artista>) => {
          this.elArtista = resp[0];
          console.log(resp);
        },
        (error: string) => {
        }
      );
}
}
