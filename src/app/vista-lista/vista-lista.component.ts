import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {ListaCancion, User,Cancion} from "../app.component";

@Component({
  selector: 'app-vista-lista',
  templateUrl: './vista-lista.component.html',
  styleUrls: ['./vista-lista.component.css']
})
export class VistaListaComponent implements OnInit {

  aparecer:boolean;

  listaMostrar: ListaCancion;

  usuarioLog: User;

  constructor(private Servicio:ServicioComponentesService) { }

  ngOnInit(): void {
    this.Servicio.sharedMessageVistaLista.subscribe(messageVistaLista => this.aparecer = messageVistaLista);
    this.Servicio.sharedMessageObjLista.subscribe(messageObjLista=> this.listaMostrar = messageObjLista);
    this.Servicio.sharedMessage.subscribe(message=> this.usuarioLog= message);
  }

}
