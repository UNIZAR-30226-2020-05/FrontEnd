import { Component, OnInit } from '@angular/core';
import {
  Album,
  AlbumRequest,
  Artista,
  ArtistaRequest,
  Cancion,
  CancionRequest,
  Podcast,
  PodcastRequest,
  User
} from '../app.component';
import {HttpClient, HttpEventType, HttpParams} from '@angular/common/http';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {


  usuarioLogeadoAd: User = new User();

  /* Controles interfaz */

  gestArtista: boolean;
  gestArtistaAdd: boolean;
  gestArtistaDel: boolean;

  gestAlbum: boolean;
  gestAlbumDel: boolean;
  gestUsuario: boolean;
  gestCanciones: boolean;
  gestPodcast: boolean;

  AgregadoNuevoAlbum: boolean;

  /* Pestaña artista */
  nuevoArtNom: string;
  nuevoArtImg: string;
  delArtisID: number;
  artistaEliminado: boolean;
  nuevoAgregado: boolean;
  artistaUnico: boolean;

  /* Pestaña album */
  nuevoAlbAutor: string;
  nuevoAlbAutorID: number;
  nuevoAlbAutorExiste: boolean;
  nuevoAlbTitulo: string;
  nuevoAlbCarat: string;
  nuevoAlbCanc: Array<CancionRequest>;
  nuevoAlbumAgregado: boolean;

  busqAlbum: Array<Album>;
  busqTitulo: string;
  albumEliminado: boolean;

  infoAgregado: string; // Almacena info de album agregado.

  cancionTitulo: string;
  cancionDuracion: string; // Se convierte en segundos.
  cancionFecha: Date;

  podTitulo: string;
  podAutor: string;
  podDurac: string;
  podFecha: Date;
  podListaTodos: Array<Podcast>;
  gestPodcastAdd: boolean;
  podcastEliminado: number;

  fileListaResults: Array<Cancion> = new Array<Cancion>();
  fileCancionNom: string;
  files: FileList; // Para canciones Y podcast
  fileProgreso: number;
  subidaEnCurso: boolean;

  gestUserPromo: boolean;
  usuarioListaTodos: Array<User>;
  usuarioEliminado: number;

  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
    this.nuevoAlbCanc = new Array<CancionRequest>();
    this.usuarioLogeadoAd = new User();
    this.cancionFecha = new Date();
    this.artistaUnico = true;
    this.gestCanciones = false;
    this.gestPodcast = false;
  }

  comprobarExisteCanc(nom: string) {

    const params = new HttpParams().set('name', this.fileCancionNom);


    this.http.get(this.Servicio.URL_API + '/song/getByName', {params})
      .subscribe(
        (resp: Array<Cancion>) => {
         this.fileListaResults = resp;
        },
        (error: string) => {
        }
      );

  }

  ngOnInit(): void {
    // Recibe el objeto usuario, y actualiza cuando se cambia.
    this.Servicio.sharedMessage.subscribe(message => this.usuarioLogeadoAd = message);
  }

  esAdminLogeado() {
    return !this.usuarioLogeadoAd.tipo_user;
  }

  vistaArtista() {
    this.gestUsuario = false;
    this.gestAlbum = false;
    this.gestArtista = true;
    this.gestCanciones = false;
    this.gestPodcast = false;
    this.nuevoArtNom = '';
    this.nuevoArtImg = '';
    this.nuevoAgregado = false;
  }

  vistaCanciones() {
    this.gestUsuario = false;
    this.gestAlbum = false;
    this.gestArtista = false;
    this.gestCanciones = true;
    this.gestPodcast = false;
    this.subidaEnCurso = false;
  }

  vistaAlbum() {
    this.gestUsuario = false;
    this.gestAlbum = true;
    this.gestArtista = false;
    this.gestCanciones = false;
    this.gestPodcast = false;

    this.nuevoAlbAutor = '';
    this.nuevoAlbAutorExiste = true;
    this.nuevoAlbTitulo = '';
    this.nuevoAlbCarat = '';
  }

  vistaUsuario() {
    this.gestUsuario = true;
    this.gestAlbum = false;
    this.gestArtista = false;
    this.gestCanciones = false;
    this.gestPodcast = false;
  }

  vistaPodcast() {
    this.gestUsuario = false;
    this.gestAlbum = false;
    this.gestArtista = false;
    this.gestCanciones = false;
    this.gestPodcast = true;
  }

  existeArtista() {
    const params = new HttpParams()
      .set('name', this.nuevoArtNom);

    this.http.get(this.Servicio.URL_API + '/artist/getByName', {params})
      .subscribe(
        (resp: Array<Artista>) => {
          let encontrado = false;
          for (const artist of resp) {
            if (!encontrado) {
              if (artist.name.toLowerCase() == this.nuevoArtNom.toLowerCase()) {
                this.artistaUnico = false;
                this.delArtisID = artist.id;
                encontrado = true;
              }
              else  {
                this.artistaUnico = true;
              }
            }
          }

        }
      );
  }

  artistaOk() {
    return this.nuevoArtNom != '' && this.nuevoArtImg != '' && this.artistaUnico;
  }

  albumOk() {
    if (this.nuevoAlbAutor != '' && this.nuevoAlbAutorExiste && this.nuevoAlbTitulo != ''
      && this.nuevoAlbCarat != '' && this.nuevoAlbCanc.length > 0) return true;
    else {return false; }
  }
  generarInfoAlbum() {
    this.infoAgregado = 'Agregado al sistema: < br /> Álbum ' + this.nuevoAlbTitulo + ' de '
    + this.nuevoAlbAutor + '< br /> que contiene:< br />';
    const i = 0;
    for (const cancion of this.nuevoAlbCanc) {
      this.infoAgregado += 'Pista ' + i + cancion.nombre + ' - ' + cancion.duracion
        + 's.< br />';
    }
  }

  existeAutor() {
    const params = new HttpParams()
      .set('name', this.nuevoAlbAutor);

    this.http.get(this.Servicio.URL_API + '/artist/getByName', {params})
      .subscribe(
        (resp: Array<Artista>) => {
          let encontrado = false;
          for (const artist of resp) {
            if (!encontrado) {
              if (artist.name == this.nuevoAlbAutor) {
                this.nuevoAlbAutorID = artist.id;
                this.nuevoAlbAutorExiste = true;
                encontrado = true;
              }
              else {
                this.nuevoAlbAutorExiste = false;
              }
            }

          }
        },
        (erroro: string) => {}
      );
  }

  agregarArtista() {
   /* const s: string = this.nuevoArtNom.substring(1, 50).toLowerCase();
    const s2: string = this.nuevoArtNom.substring(0, 1).toUpperCase();*/

    const nuevo: ArtistaRequest = {
      nombre: this.nuevoArtNom,
      imagen: this.nuevoArtImg + '.jpg'
    };

    this.http.post(this.Servicio.URL_API + '/artist/add', nuevo).subscribe(
      (resp: string) => { this.nuevoAgregado = true; } );
  }

  eliminarArtista() {
    this.http.delete(this.Servicio.URL_API + '/artist/delete/' + this.delArtisID).subscribe(
      (resp: string) => { this.artistaEliminado = true; } );
  }

  agregarUnaCancion() {
    const nueva: CancionRequest = {
      nombre: this.cancionTitulo,
      fecha_subida: this.cancionFecha,
      duracion: this.transformarDuracion(this.cancionDuracion)// this.cancionDuracion PASAR A ENTERO
    };
    this.nuevoAlbCanc.push(nueva);
    // Limpiar param de cancion i.
    this.cancionTitulo = '';
    this.cancionDuracion = '';
  }

  resetListaNuevoAlb() {
    this.nuevoAlbCanc.length = 0;
  }

  agregarAlbum() {
    const nuevoAlbum: AlbumRequest = {
      id_artista: this.nuevoAlbAutorID,
      titulo: this.nuevoAlbTitulo,
      caratula: this.nuevoAlbCarat + '.jpg',
      canciones: this.nuevoAlbCanc
    }

    this.generarInfoAlbum();
    this.nuevoAlbumAgregado = true;
    this.http.post(this.Servicio.URL_API + '/album/add', nuevoAlbum).subscribe(
      (resp: string) => { this.AgregadoNuevoAlbum = true; } );
  }

  agregarPodcast() {

    const nuevo: PodcastRequest = {
      nombre: this.podTitulo,
      artista: this.podAutor,
      fecha_subida: this.podFecha,
      duracion: this.transformarDuracion(this.podDurac) // Nickname
    };

    this.http.post(this.Servicio.URL_API + '/podcast/add', nuevo).subscribe(
      (resp: string) => {} );

  }

  transformarDuracion(s: string) {
    const part = s.split(':');
    return (Number(part[0]) * 60 + Number(part[1]));
  }

  fchaActual() {
    const d = new Date();
    return d.getFullYear().toString() + '-' + d.getMonth().toString()
      + '-' + d.getDay().toString();
  }

  mostrarLogin() {
    this.usuarioLogeadoAd.tipo_user = true;
    this.Servicio.nextMessage2(false);
  }

  buscarAlbum() {
    const params = new HttpParams()
      .set('titulo', this.busqTitulo);

    this.http.get(this.Servicio.URL_API + '/album/getByTitulo', {params}).subscribe(
      (resp: Array<Album>) => { this.busqAlbum = resp; } );
  }

  eliminarAlbum(id: number) {
    this.http.delete(this.Servicio.URL_API + '/album/delete/' + id).subscribe(
      (resp: string) => { this.albumEliminado = true; } );
  }

  cargarTodosUsuarios() {
    this.http.get(this.Servicio.URL_API + '/user/findAll').subscribe(
      (resp: Array<User>) => { this.usuarioListaTodos = resp; } );
  }

  cargarTodosPodcasts() {
    this.http.get(this.Servicio.URL_API + '/podcast/getByName?name=').subscribe(
      (resp: Array<Podcast>) => { this.podListaTodos = resp; } );
  }

  eliminarUsuario(id: number) {
    this.http.delete(this.Servicio.URL_API + '/user/delete/' + id).subscribe(
      (resp: string) => { this.cargarTodosUsuarios(); } );
  }

  eliminarPodcast(id: number) {
    this.http.delete(this.Servicio.URL_API + '/podcast/delete/' + id).subscribe(
      (resp: string) => {
        this.podcastEliminado = id;
        this.cargarTodosUsuarios(); } );
  }

  subirCancion(nom: string) {
    this.subidaEnCurso = true;
    this.uploadAapi(this.files.item(0), nom);
    console.log(this.files.item(0));
  }

  subirPodcast(nom: string) {
    this.uploadPodcastAapi(this.files.item(0), nom);
    console.log(this.files.item(0));
  }

  uploadAapi(file: File, nombre: string) {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('nombre', nombre);
    this.http.post(this.Servicio.URL_API + '/song/upload', data, {
      reportProgress: true, observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          this.fileProgreso = Math.round(100 * event.loaded / event.total);
          if (this.fileProgreso === 100) {this.limpiarDatosSubida();}
          return { status: 'progress' };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }))
      .subscribe(
      (resp: string) => { console.log(resp)} );
  }

  limpiarDatosSubida() {
    this.fileCancionNom = '';
    this.fileListaResults.length = 0;
    this.subidaEnCurso = false;
  }

  uploadPodcastAapi(file: File, nombre: string) {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('nombre', nombre);
    this.http.post(this.Servicio.URL_API + '/podcast/upload', data).subscribe(
      (resp: string) => { console.log(resp); } );
  }

  onFileChange(event) {
    this.files = null;
    this.files = event.target.files;
    console.log(event);
  }


}
