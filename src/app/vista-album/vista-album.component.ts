import {Component, OnInit,Input, Output} from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {Album, Artista, ListaCancion, User} from '../app.component';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-vista-album',
  templateUrl: './vista-album.component.html',
  styleUrls: ['./vista-album.component.css']
})
export class VistaAlbumComponent implements OnInit {

  lista = ['Primo Victoria', 'Reign of Terror', 'Wolfpack','Counterstrike', 'Stalingrad', 'Into the Fire',
    'Purple Heart', 'Metal Machine','Counterstrike 2', 'Metal Machine','Counterstrike 2','Counterstrike 2', 'Metal Machine'];

  //
  albActivo: Album = new Album();
  userActivo: User;

  reproduccAlbum: string;

  vistaSelCan: boolean;
  cancionObjetivo: number;
  vistaSelAlb: boolean;
  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
    this.vistaSelCan = false;
    this.vistaSelAlb = false;
    this.reproduccAlbum = '';
  }

  show: boolean;
  ngOnInit(): void {
    //Flag para saber cuando activar la vista de album
    this.Servicio.sharedMessage3.subscribe(message3 => this.show = message3);

    //Recibe el objeto album, y actualiza cuando se cambia.
    this.Servicio.albumActivo.subscribe(albumObj => {
      this.albActivo = albumObj;
    });

    //Recbe el usuario logeado (para listas)
    this.Servicio.sharedMessage.subscribe(userRecibido => this.userActivo = userRecibido);
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

  anyadirAlista( id_lista: number, id_c: number) {

    this.http.patch(this.Servicio.URL_API + '/listaCancion/add/' + id_lista, id_c).subscribe(
      (resp: ListaCancion) => { console.log(resp); this.userActivo.lista_cancion[0]=resp;this.Servicio.nextMessage(this.userActivo) } );
  }

  anyadirAlbumAlista(id_lista: number){
    this.http.patch(this.Servicio.URL_API + '/listaCancion/addByAlbum/' + id_lista,
      this.albActivo.id).subscribe(
      (resp: ListaCancion) => {   this.vistaSelAlb = false;
        if(resp.nombre == 'Favoritos'){this.userActivo.lista_cancion[0]=resp;this.Servicio.nextMessage(this.userActivo)} });
  }

  repr(alb) {
    this.Servicio.reproducirLista(alb);
  }
  consola(){
    console.log(this.albActivo);
  }

  cargarArtista(art: string) {
    const params = new HttpParams().set('name', art);
    this.http.get(this.Servicio.URL_API + '/artist/getByName', {params})
      .subscribe(
        (resp: Array<Artista>) => {
          this.Servicio.cargarAlbumesArtista(resp[0].id);
          this.Servicio.cargarArtista(art);
        },
        (erroro: string) => {
        }
      );
  }

}
