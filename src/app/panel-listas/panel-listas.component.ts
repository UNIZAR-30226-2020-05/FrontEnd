import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-listas',
  templateUrl: './panel-listas.component.html',
  styleUrls: ['./panel-listas.component.css']
})
export class PanelListasComponent implements OnInit {

  mostrarCrear:boolean=false;
  mostrarFav:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
