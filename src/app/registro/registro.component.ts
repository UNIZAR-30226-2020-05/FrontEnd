import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @Input() registro1; //Flag si se solicita proceso de registro
  public registro2; //Flag si está en el paso dos de registro.

  imageSeleccion;
  constructor() { }

  ngOnInit(): void {
    this.registro1=false;
    this.registro2=false;
    this.imageSeleccion=0;
  }

  receiveMessageChild($event){
    this.registro1=($event)
  }

}
