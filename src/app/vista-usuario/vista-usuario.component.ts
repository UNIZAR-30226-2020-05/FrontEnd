import { Component, OnInit } from '@angular/core';
import {Album, ListaCancion, User} from "../app.component";
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-vista-usuario',
  templateUrl: './vista-usuario.component.html',
  styleUrls: ['./vista-usuario.component.css']
})
export class VistaUsuarioComponent implements OnInit {
  aparecerUsuario:boolean;

  listaMostrar: ListaCancion;

  usuarioLog: User;

  play:boolean=false;

  albumActual:Album;

  constructor(public Servicio:ServicioComponentesService, private http:HttpClient) { }

  ngOnInit(): void {
    this.Servicio.sharedMessage.subscribe(message=> this.usuarioLog= message);
    this.Servicio.sharedMessageVistaUsuario.subscribe(vistaUsuario => this.aparecerUsuario= vistaUsuario);
  }

  borrar(lista){
    this.http.delete(this.Servicio.URL_API + '/listaCancion/delete/' + lista).subscribe((resp:string) => console.log(resp));
    this.Servicio.nextMessage(this.usuarioLog);
  }

  borrarPodcast(lista){
    this.http.delete(this.Servicio.URL_API + '/listaPodcast/delete/' + lista).subscribe((resp:string) => console.log(resp));
    this.Servicio.nextMessage(this.usuarioLog);
  }

  reproducir(lista){
    this.Servicio.reproducirLista(lista);
  }

}
