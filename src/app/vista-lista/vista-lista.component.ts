import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {ListaCancion, User, Cancion, Album, Artista} from "../app.component";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-vista-lista',
  templateUrl: './vista-lista.component.html',
  styleUrls: ['./vista-lista.component.css']
})
export class VistaListaComponent implements OnInit {

  aparecer:boolean;

  listaMostrar: ListaCancion= new ListaCancion();

  usuarioLog: User = new User();
  usuario: User = new User();

  play:boolean=false;

  albumActual:Album=new Album();

  cancionPrimera:Cancion = new Cancion();

  constructor(public Servicio:ServicioComponentesService, private http:HttpClient) { }

  ngOnInit(): void {
    this.Servicio.sharedMessageVistaLista.subscribe(messageVistaLista => this.aparecer = messageVistaLista);
    this.Servicio.sharedMessageObjLista.subscribe(messageObjLista=> this.listaMostrar = messageObjLista);
    this.Servicio.sharedMessage.subscribe(message=> this.usuarioLog= message);
    this.Servicio.sharedMessageobjAlbum.subscribe(albumObj => {if (albumObj!= null) {this.albumActual= albumObj;}});
    this.Servicio.sharedMessageUsuarioAList.subscribe(usuario => this.usuario = usuario);
  }

  borrar() {
    this.Servicio.nextMessageBorrarLista(this.listaMostrar.id);
    this.http.delete(this.Servicio.URL_API + '/listaCancion/delete/' + this.listaMostrar.id).subscribe((resp: string) => {
      const params = new HttpParams()
        .set('nick', this.usuarioLog.nick);
      this.http.get(this.Servicio.URL_API + '/user/get', {params})
        .subscribe(
          (resp: User) => {
            this.Servicio.nextMessage(resp);
            //this.Servicio.nextMessage(this.usuarioLog);
            this.aparecer = false;
            this.Servicio.nextMessageCentral(true);
          },
          (erroro: string) => {
          }
        );
    });
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

  cargarCaratula(cancion){
    // Carga localmente los datos el album
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

  borrarCancion(cancion:number,lista:number){
    this.http.patch(this.Servicio.URL_API + '/listaCancion/deleteSong/' + lista, cancion).subscribe((resp:ListaCancion) =>
    {console.log(resp); this.listaMostrar=resp});

  }

  ordenarFecha(){
    this.listaMostrar.canciones=this.listaMostrar.canciones.reverse();

  }



  ordenarArtista(){

    this.listaMostrar.canciones.sort((a, b) => {
      if (a.artistas < b.artistas) return -1;
      else if (a.artistas > b.artistas) return 1;
      else return 0;
    });
  }

  ordenarPorNombre(){
    this.listaMostrar.canciones.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
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
