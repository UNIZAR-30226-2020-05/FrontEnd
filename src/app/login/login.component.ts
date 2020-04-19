import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';
import {User, UserRequest} from '../app.component';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logeado;
  registro:boolean=true;
  aviso:boolean=false;

  // campos de login
  nomUsuario:string;
  contrasena:string;
  correctoNick:string;
  correctoPass: string;


  public URL_API = 'http://localhost:8080';


  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private Servicio: ServicioComponentesService) {
    this.nomUsuario='';
    this.contrasena='';
  }

  ngOnInit(): void {
    this.logeado=false;
    this.Servicio.nextMessage(this.usuario);
    this.Servicio.sharedMessage2.subscribe(message2 => this.logeado=message2);
  }

  sendMessageFather(){
    this.messageEvent.emit(this.registro);
  }

  usuario:User;
  comprobar(){
    const params= new HttpParams().set('nick',this.nomUsuario).set('pass',btoa(this.contrasena));
    this.http.get(this.URL_API + '/user/logIn',{params}).subscribe(
      (resp:User) => { this.logeado=true;this.usuario=resp;this.correctoNick= resp.nick;console.log(resp.nick);

        },
      (error:string)=> {this.aviso=true;});
  }

}
