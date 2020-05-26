import { Component, OnInit } from '@angular/core';
import {Album, ListaCancion, ListaPodcast, User} from "../app.component";
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-vista-podcast',
  templateUrl: './vista-podcast.component.html',
  styleUrls: ['./vista-podcast.component.css']
})
export class VistaPodcastComponent implements OnInit {

  vistaPodcast: boolean;

  listaMostrar: ListaPodcast;

  usuarioLog: User = new User();
  usuario: User = new User();

  play: boolean = false;


  constructor(public Servicio: ServicioComponentesService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.Servicio.sharedMessageVistaPodcast.subscribe(messageVistaPodcast => this.vistaPodcast = messageVistaPodcast);
    this.Servicio.sharedMessageObjPodcast.subscribe(messageObjPodcast => this.listaMostrar = messageObjPodcast);
    this.Servicio.sharedMessage.subscribe(message => this.usuarioLog = message);
    this.Servicio.sharedMessageUsuarioAList.subscribe(usuario => this.usuario = usuario);
  }

  borrar() {
    this.http.delete(this.Servicio.URL_API + '/listaPodcast/delete/' + this.listaMostrar.id).subscribe((resp: string) => { console.log(resp);
      const params = new HttpParams()
        .set('nick', this.usuarioLog.nick);
      this.http.get(this.Servicio.URL_API + '/user/get', {params})
        .subscribe(
          (resp: User) => {
            this.Servicio.nextMessage(resp);
          },
          (erroro: string) => {
          }
        );
    for (var i = 0; i < this.usuarioLog.lista_podcast.length - 1; i++){
      if(this.usuarioLog.lista_podcast[i].id == this.listaMostrar.id){
        this.usuarioLog.lista_podcast.slice(i - 1, 1);
      }
    }
    this.Servicio.nextMessageListaBorrada(this.usuarioLog.lista_podcast)});
    this.Servicio.nextMessage(this.usuarioLog);
    this.vistaPodcast = false;
    this.Servicio.nextMessageCentral(true);
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
    this.Servicio.reproducirListaPodcast(lista);
  }


  borrarPodcast(podcast: number, lista: number) {
    this.http.patch(this.Servicio.URL_API + '/listaPodcast/deletePodcast/' + lista, podcast).subscribe((resp: ListaPodcast) => {
      console.log(resp);
      this.listaMostrar = resp
    });

  }
}
