import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registro1; //Flag si se solicita proceso de registro
  registro2; //Flag si está en el paso dos de registro.

  imageSeleccion;
  constructor() { }

  ngOnInit(): void {
    this.registro1=true;
    this.registro2=false;
    this.imageSeleccion=0;
  }

}
