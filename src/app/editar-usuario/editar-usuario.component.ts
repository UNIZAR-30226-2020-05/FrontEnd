import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  @Input() mostrar;
  public imageSeleccion;

  constructor() { }

  receiveMessageChild($event) {
    this.mostrar = ($event);
  }

  cancelarEdit() {
    this.mostrar = false;
  }
  finalizarEdit() {
    this.mostrar = false;
  }
  ngOnInit(): void {
  }

}
