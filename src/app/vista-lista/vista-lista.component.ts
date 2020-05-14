import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {ListaCancion, User, Cancion, Album} from "../app.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-vista-lista',
  templateUrl: './vista-lista.component.html',
  styleUrls: ['./vista-lista.component.css']
})
export class VistaListaComponent implements OnInit {

  aparecer:boolean;

  listaMostrar: ListaCancion= new ListaCancion();

  usuarioLog: User;

  play:boolean=false;

  albumActual:Album=new Album();

  constructor(public Servicio:ServicioComponentesService, private http:HttpClient) { }

  ngOnInit(): void {
    this.Servicio.sharedMessageVistaLista.subscribe(messageVistaLista => this.aparecer = messageVistaLista);
    this.Servicio.sharedMessageObjLista.subscribe(messageObjLista=> this.listaMostrar = messageObjLista);
    this.Servicio.sharedMessage.subscribe(message=> this.usuarioLog= message);
    this.Servicio.albumActivo.subscribe(albumObj => {if (albumObj!= null) {this.albumActual= albumObj;}});
  }

  borrar(){
    this.http.delete(this.Servicio.URL_API + '/listaCancion/delete/' + this.listaMostrar.id).subscribe((resp:string) => console.log(resp));
    this.Servicio.nextMessage(this.usuarioLog);
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

  reproducir(lista){
    this.Servicio.reproducirLista(lista);
  }

  cargarCaratula(cancion){
    this.Servicio.cargarAlbum(cancion);
    this.Servicio.enviarAlbumPlay(this.albumActual);
    this.albumActual=null;
  }

  borrarCancion(cancion:number,lista:number){
    this.http.patch(this.Servicio.URL_API + '/listaCancion/deleteSong/' + lista, cancion).subscribe((resp:ListaCancion) =>
    {console.log(resp); this.listaMostrar=resp});

  }
}
