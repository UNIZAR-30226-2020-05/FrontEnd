import { Component, OnInit } from '@angular/core';
import {Album, AlbumRequest, Artista, ArtistaRequest, CancionRequest, User, UserRequest} from '../app.component';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {


  usuarioLogeadoAd: User;
  gestArtista: boolean;
  gestAlbum: boolean;
  gestCancion: boolean;
  AgregadoNuevoAlbum: boolean;

  nuevoArtNom: string;
  nuevoArtImg: string;
  nuevoAgregado: boolean;


  nuevoAlbAutor: string;
  nuevoAlbTitulo: string;
  nuevoAlbCarat: string;
  nuevoAlbCanc: Array<CancionRequest>;

  cancionTitulo: string;
  cancionDuracion: string; // Se convierte en segundos.
  cancionFecha: Date;

  constructor(private http: HttpClient, private Servicio: ServicioComponentesService) {
    this.nuevoAlbCanc = new Array<CancionRequest>();
    this.cancionFecha = new Date();
  }

  ngOnInit(): void {
    //Recibe el objeto usuario, y actualiza cuando se cambia.
    this.Servicio.sharedMessage.subscribe(message => this.usuarioLogeadoAd = message);
  }

  esAdminLogeado() {
    return !this.usuarioLogeadoAd.tipo_user;
  }

  vistaArtista() {
    this.gestCancion = false;
    this.gestAlbum = false;
    this.gestArtista = true;
    this.nuevoArtNom = '';
    this.nuevoArtImg = '';
    this.nuevoAgregado = false;
  }

  vistaAlbum() {
    this.gestCancion = false;
    this.gestAlbum = true;
    this.gestArtista = false;
  }

  vistaCancion() {
    this.gestCancion = true;
    this.gestAlbum = false;
    this.gestArtista = false;
  }

  existeArtista(){
    /*const params = new HttpParams()
      .set('nick', this.alias);

    this.http.get(this.Servicio.URL_API + '/artist/get', {params})
      .subscribe(
        (resp: User) => {
          this.usuarioUnico = false;
        },
        (erroro: string) => {
          this.usuarioUnico = true;
        }
      );*/
  }

  agregarArtista() {
    /*let nuevo = new ArtistaRequest();
    nuevo.nombre = this.nuevoArtNom;
    nuevo.imagen = this.nuevoArtImg;
    */
    const nuevo: ArtistaRequest = {
      nombre: this.nuevoArtNom,
      imagen: this.nuevoArtImg
    };
    this.http.post(this.Servicio.URL_API + '/artist/add', nuevo).subscribe(
      (resp: string) => { this.nuevoAgregado = true; } );
  }

  agregarUnaCancion() {
    const nueva: CancionRequest = {
      nombre: this.cancionTitulo,
      fecha_subida: this.cancionFecha,
      duracion: this.transformarDuracion(this.cancionDuracion)// this.cancionDuracion PASAR A ENTERO
    };
    this.nuevoAlbCanc.push(nueva);
    //Limpiar param de cancion i.
    this.cancionTitulo = '';
    this.cancionDuracion = '';
  }

  agregarAlbum() {
    const nuevoAlbum: AlbumRequest = {
      id_artista: 15, // sacar ID DE this.nuevoAlbAutor,
      titulo: this.nuevoAlbTitulo,
      caratula: this.nuevoAlbCarat,
      canciones: this.nuevoAlbCanc
    }

    this.http.post(this.Servicio.URL_API + '/album/add', nuevoAlbum).subscribe(
      (resp: string) => { this.AgregadoNuevoAlbum = true; } );
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
}
