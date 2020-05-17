
import {Component, OnInit, Input, Output} from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {Album, Artista} from '../app.component';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-vista-artista',
  templateUrl: './vista-artista.component.html',
  styleUrls: ['./vista-artista.component.css']
})

export class VistaArtistaComponent implements OnInit {

  artistaActivo: Artista = new Artista();
  lisAlbum: Array<Album>;

  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {}

  mostrar: boolean;
  ngOnInit(): void {

    this.Servicio.artistaActivo.subscribe(artistaObj => {
      this.artistaActivo = artistaObj;
      /*let i = 0;
      for (const albumDeLista of this.artistaActivo.albumes) {
        const params = new HttpParams().set('titulo', albumDeLista);

        this.http.get(this.Servicio.URL_API + '/album/getByTitulo', {params})
          .subscribe(
            (resp: Array<Album>) => {
              this.lisAlbum[i] = resp[0];
            },
            (error: string) => {
            }
          );
        i++;
      }*/
    });
    this.Servicio.sharedMessageArtista.subscribe(messageArtista => this.mostrar = messageArtista);
  }
  /*getAlbum(titulo) {
    const params = new HttpParams().set('titulo', titulo);

    this.http.get(this.Servicio.URL_API + '/album/getByTitulo', {params})
      .subscribe(
        (resp: Array<Album>) => {
          this.lisAlbum = resp;
        },
        (error: string) => {
        }
      );
  }*/
  cerrar() {
    this.mostrar = false;
  }

}
