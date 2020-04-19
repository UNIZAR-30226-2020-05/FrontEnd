import {Component, Output,EventEmitter, OnInit} from '@angular/core';
import {ServicioComponentesService} from "../servicio-componentes.service";
import {User} from "../app.component";

@Component({
  selector: 'app-panel-listas',
  templateUrl: './panel-listas.component.html',
  styleUrls: ['./panel-listas.component.css']
})
export class PanelListasComponent implements OnInit {

  mostrarCrear:boolean=false;
  mostrarFav:boolean=false;
  okVista:boolean=true;
  usuario: User;

  constructor(private Servicio: ServicioComponentesService) { }

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

}
