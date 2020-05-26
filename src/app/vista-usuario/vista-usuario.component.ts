import { Component, OnInit } from '@angular/core';
import {Album, Cancion, ListaCancion, ListaPodcast, Podcast, User} from "../app.component";
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit {
  aparecerUsuario:boolean;

  usuario: User= new User();
  usuarioLog :User = new User();

  play:boolean=false;

  ultimAlbum: Album= new Album();

  okVista:boolean=true;
  okVistaPodcast:boolean=true;

  listaOk:ListaCancion = new ListaCancion();
  listaOkPodcast:ListaPodcast = new ListaPodcast();

  podcast: Podcast = new Podcast();
  esPodcast:boolean = false;

  constructor(public Servicio:ServicioComponentesService, private http:HttpClient) { }

  ngOnInit(): void {
    this.Servicio.sharedMessageNomUsuario.subscribe(message=> {
      const params= new HttpParams().set('nick',message);
      this.http.get(this.Servicio.URL_API + '/user/get', {params}).subscribe( (resp: User)  => {
        this.usuario = resp;
        if(this.usuario.tipo_ultima_reproduccion == 0){ //es cancion
          if (this.usuario.id_ultima_reproduccion != null && this.usuario.minuto_ultima_reproduccion != null) {

            const params = new HttpParams().set('name', '');
            this.http.get(this.Servicio.URL_API + '/song/getByName', {params})
              .subscribe(
                (resp: Array<Cancion>) => {

                  let encontrado = false;
                  for (const cancionc of resp) {
                    if (!encontrado) {
                      if (cancionc.id === this.usuario.id_ultima_reproduccion) {

                        const params = new HttpParams().set('titulo', cancionc.album.toString());
                        this.http.get(this.Servicio.URL_API + '/album/getByTitulo', {params})
                          .subscribe(
                            (alb: Array<Album>) => {
                              this.ultimAlbum = alb[0];
                            }
                          );
                        encontrado = true;
                      }
                    }
                  }

                }
              );
          }
        }
        else{
          if (this.usuario.id_ultima_reproduccion != null && this.usuario.minuto_ultima_reproduccion != null) {
            const params = new HttpParams().set('name', '');
            this.http.get(this.Servicio.URL_API + '/podcast/getByName', {params})
              .subscribe(
                (resp: Array<Podcast>) => {

                  let encontrado = false;
                  for (const podcastc of resp) {
                    if (!encontrado) {
                      if (podcastc.id === this.usuario.id_ultima_reproduccion) {
                        this.podcast=podcastc;
                        this.esPodcast=true;
                        encontrado = true;
                      }
                    }
                  }

                }
              );
          }
        }

      });
    });
    this.Servicio.sharedMessageVistaUsuario.subscribe(vistaUsuario => this.aparecerUsuario= vistaUsuario);
    this.Servicio.sharedMessageVistaLista.subscribe(vistaC => this.okVista= vistaC);
    this.Servicio.sharedMessageVistaPodcast.subscribe(vista => this.okVistaPodcast = vista);
    this.Servicio.sharedMessage.subscribe(usuariolog => this.usuarioLog = usuariolog);
  }

  borrar(lista){
    this.http.delete(this.Servicio.URL_API + '/listaCancion/delete/' + lista).subscribe((resp:string) => console.log(resp));
    this.Servicio.nextMessage(this.usuario);
  }

  borrarPodcast(lista){
    this.http.delete(this.Servicio.URL_API + '/listaPodcast/delete/' + lista).subscribe((resp:string) => console.log(resp));
    this.Servicio.nextMessage(this.usuario);
  }

  listaPulsada(id: number){
    const param = id.toString();
    const params = new HttpParams().set('id', param);
    this.http.get(this.Servicio.URL_API + '/listaCancion/get', {params}).subscribe( (resp: ListaCancion) =>
    {this.listaOk=resp; this.Servicio.nextMessageObjLista(this.listaOk);this.Servicio.obtenerAlbum(this.listaOk.nombre)});

  }
  listaPulsadaPodcast(id: number){
    const param = id.toString();
    const params = new HttpParams().set('id', param);
    this.http.get(this.Servicio.URL_API + '/listaPodcast/get', {params}).subscribe( (resp: ListaPodcast) =>
    {this.listaOkPodcast=resp; this.Servicio.nextMessageObjPodcast(this.listaOkPodcast);});

  }
}
