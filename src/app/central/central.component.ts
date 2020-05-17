import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Album, ListaCancion, Podcast, User} from '../app.component';


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

  okVista = true;
  listaOk: ListaCancion;



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
  }
}
