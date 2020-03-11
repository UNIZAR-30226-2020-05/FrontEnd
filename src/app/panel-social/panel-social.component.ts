import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-social',
  templateUrl: './panel-social.component.html',
  styleUrls: ['./panel-social.component.css']
})
export class PanelSocialComponent implements OnInit {

  constructor() { }

  listaVacia;

  ngOnInit(): void {
    this.listaVacia=true;
  }

}
