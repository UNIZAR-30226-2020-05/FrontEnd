import {Component, Output,EventEmitter, OnInit} from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {ListaCancionRequest, User} from "../app.component";
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-panel-listas',
  templateUrl: './panel-listas.component.html',
  styleUrls: ['./panel-listas.component.css']
})
export class PanelListasComponent implements OnInit {

  mostrarCrearP:boolean=false;
  mostrarCrearC:boolean=false;
  mostrarFav:boolean=false;
  okVista:boolean=true;
  usuario: User;
  nombreLista: string;

  public URL_API = 'http://localhost:8080';

  constructor(private http: HttpClient,private Servicio: ServicioComponentesService) { }

  ngOnInit(): void {
    this.Servicio.sharedMessage.subscribe(message => this.usuario=message);
    this.Servicio.sharedMessage3.subscribe(message3 => this.okVista=message3);
  }
  newMessage() {
    this.Servicio.nextMessage(this.usuario);
  }

  enviarToAlbum(){
    this.Servicio.nextMessage3(!this.okVista);
  }


  nuevaListaCanciones(){
    const lista: ListaCancionRequest = {
      id_user: this.usuario.id,
      nombre: this.nombreLista,
    };

    this.http.post(this.URL_API + '/listaCancion/create', lista).subscribe(
      (resp: string) => { console.log(resp); } );



  }
}
