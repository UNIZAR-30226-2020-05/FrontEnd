import { Component, OnInit } from '@angular/core';
import {Album, User} from '../app.component';
import {HttpClient} from '@angular/common/http';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  usuarioLogeadoAd: User;

  albumNuevo: Album;

  constructor(private http: HttpClient, private Servicio: ServicioComponentesService) {


  }

  ngOnInit(): void {
    //Recibe el objeto usuario, y actualiza cuando se cambia.
    this.Servicio.sharedMessage.subscribe(message => this.usuarioLogeadoAd = message);
  }

  esAdminLogeado() {
    return !this.usuarioLogeadoAd.tipo_user;
  }
}
