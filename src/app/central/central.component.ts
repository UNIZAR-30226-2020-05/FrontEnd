import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient} from '@angular/common/http';
import {Album, User} from '../app.component';


@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.css']
})
export class CentralComponent implements OnInit {
  mostrar = true;
  usuarioLogeado: User; // Quien está en la plataforma
  numPlaylist: number;
  recomendaciones: Array<Album>;


  constructor(private http: HttpClient, private Servicio: ServicioComponentesService) { }

  ngOnInit(): void {
    this.mostrar = true;
    this.Servicio.sharedMessage.subscribe(userRecibido => this.usuarioLogeado = userRecibido);
    this.numPlaylist = this.usuarioLogeado.lista_cancion.length;
    this.Servicio.sharedMessageCentral.subscribe(messageCentral => this.mostrar = messageCentral);
  }

  /*getRecomendaciones() {
    this.http.get(this.Servicio.URL_API + ruta_a_funcion)
      .subscribe(
        (resp: Array<Album>) => {
          this.recomendaciones = resp;
          console.log(this.recomendaciones);
        },
      );

  }*/

}
