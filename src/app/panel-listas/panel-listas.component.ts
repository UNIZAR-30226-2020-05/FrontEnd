import {Component, Output,EventEmitter, OnInit} from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {User} from "../app.component";

@Component({
  selector: 'app-panel-listas',
  templateUrl: './panel-listas.component.html',
  styleUrls: ['./panel-listas.component.css']
})
export class PanelListasComponent implements OnInit {
  @Output() messageEvent2 = new EventEmitter<boolean>();

  mostrarCrear:boolean=false;
  mostrarFav:boolean=false;
  okVista:boolean=true;
  usuario: User;

  sendMessageAlbum(){
    this.messageEvent2.emit(this.okVista);
  }
  constructor(private Servicio: ServicioComponentesService) { }

  ngOnInit(): void {
    this.Servicio.sharedMessage.subscribe(message => this.usuario=message)
  }
  newMessage() {
    this.Servicio.nextMessage(this.usuario);
  }

}
