import { Component, OnInit } from '@angular/core';
import {Album, ListaCancion, ListaPodcast, User} from "../app.component";
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-vista-podcast',
  templateUrl: './vista-podcast.component.html',
  styleUrls: ['./vista-podcast.component.css']
})
export class VistaPodcastComponent implements OnInit {

  vistaPodcast: boolean;

  listaMostrar: ListaPodcast;

  usuarioLog: User;

  play: boolean = false;

  albumActual: Album;

  constructor(public Servicio: ServicioComponentesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Servicio.sharedMessageVistaPodcast.subscribe(messageVistaPodcast => this.vistaPodcast = messageVistaPodcast);
    this.Servicio.sharedMessageObjPodcast.subscribe(messageObjPodcast => this.listaMostrar = messageObjPodcast);
    this.Servicio.sharedMessage.subscribe(message => this.usuarioLog = message);
    this.Servicio.albumActivo.subscribe(albumObj => {
      if (albumObj != null) {
        this.albumActual = albumObj;
      }
    });
  }

  borrar() {
    this.http.delete(this.Servicio.URL_API + '/listaPodcast/delete/' + this.listaMostrar.id).subscribe((resp: string) => console.log(resp));
    this.Servicio.nextMessage(this.usuarioLog);
  }

  sacarTiempo(n: number) {
    let s = '';
    let auxMin;
    let auxSeg;
    auxMin = Math.floor(n / 60);
    auxSeg = Math.floor(n % 60);
    if (auxMin < 10) {
      s += '0';
    }
    s += auxMin.toString() + ':';
    if (auxSeg < 10) {
      s += '0';
    }
    s += auxSeg.toString();
    return s;
  }

  reproducir(lista) {
    this.Servicio.reproducirLista(lista);
  }

  cargarCaratula(cancion) {
    this.Servicio.cargarAlbum(cancion);
    this.Servicio.enviarAlbumPlay(this.albumActual);
    this.albumActual = null;
  }

  borrarPodcast(podcast: number, lista: number) {
    this.http.patch(this.Servicio.URL_API + '/listaPodcast/deletePodcast/' + lista, podcast).subscribe((resp: ListaPodcast) => {
      console.log(resp);
      this.listaMostrar = resp
    });

  }
}