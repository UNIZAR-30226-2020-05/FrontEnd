import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {ListaCancion, User,Cancion} from "../app.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-vista-lista',
  templateUrl: './vista-lista.component.html',
  styleUrls: ['./vista-lista.component.css']
})
export class VistaListaComponent implements OnInit {

  aparecer:boolean;

  listaMostrar: ListaCancion;

  usuarioLog: User;

  constructor(public Servicio:ServicioComponentesService, private http:HttpClient) { }

  ngOnInit(): void {
    this.Servicio.sharedMessageVistaLista.subscribe(messageVistaLista => this.aparecer = messageVistaLista);
    this.Servicio.sharedMessageObjLista.subscribe(messageObjLista=> this.listaMostrar = messageObjLista);
    this.Servicio.sharedMessage.subscribe(message=> this.usuarioLog= message);
  }

  borrar(){
    this.http.delete(this.Servicio.URL_API + '/listaCancion/delete/' + this.listaMostrar.id).subscribe((resp:string) => console.log(resp));
    this.usuarioLog.lista_cancion.splice(this.listaMostrar.id-1,1);
    this.Servicio.nextMessage(this.usuarioLog);
  }

}
