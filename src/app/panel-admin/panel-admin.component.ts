import { Component, OnInit } from '@angular/core';
import {Album, Artista, ArtistaRequest, User, UserRequest} from '../app.component';
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
  albumNuevo: Album;

  nuevoArtNom: string;
  nuevoArtImg: string;
  nuevoAgregado: boolean;

  constructor(private http: HttpClient, private Servicio: ServicioComponentesService) {


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
    const nuevo: ArtistaRequest = { // Objeto usuario en registro
      nombre: this.nuevoArtNom,
      imagen: this.nuevoArtImg
    };
    this.http.post(this.Servicio.URL_API + '/artist/add', nuevo).subscribe(
      (resp: string) => { this.nuevoAgregado = true; } );
  }
}
