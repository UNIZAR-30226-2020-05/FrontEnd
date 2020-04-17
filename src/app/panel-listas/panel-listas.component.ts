import {Component, Output,EventEmitter, OnInit} from '@angular/core';

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

  sendMessageAlbum(){
    this.messageEvent2.emit(this.okVista);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
