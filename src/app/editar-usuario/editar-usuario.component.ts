import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  @Input() mostrar;
  public imageSeleccion;

  public URL_API = 'http://localhost:8080';

  // Atributo a cambiar
  passN: string;
  passN2: string;
  id: number;
  constructor(private http: HttpClient) {
    this.passN = '';
    this.passN2 = '';
    this.id = 5;
  }

  receiveMessageChild($event) {
    this.mostrar = ($event);
  }

  cancelarEdit() {
    this.mostrar = false;
  }
  borrarUsuario() {
    this.http.delete(this.URL_API + '/user/delete/' + this.id).subscribe(
      (resp: string) => { console.log(resp); } );
    this.mostrar = false;
  }
  contrasenaBien() {
    return (this.passN !== '' && this.passN2 !== '' && this.passN === this.passN2);
  }
  cambio() {
    this.http.patch(this.URL_API + '/user/modifyPass/' + this.id, btoa(this.passN)).subscribe(
      (resp: string) => { console.log(resp); } );
    this.mostrar = false;
  }

  ngOnInit(): void {
  }

}
