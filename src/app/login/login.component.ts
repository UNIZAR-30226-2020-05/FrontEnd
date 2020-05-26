import {Component, Output, EventEmitter, OnInit, Input} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';
import {User, UserRequest} from '../app.component';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logeado;
  registro: boolean = true;
  aviso: boolean = false;

  // campos de login
  nomUsuario: string;
  contrasena: string;
  correctoNick: string;
  correctoPass: string;

  usuario: User = new User();


  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
    this.nomUsuario = '';
    this.contrasena = '';
  }

  ngOnInit(): void {
    this.logeado=false;
    this.Servicio.nextMessage2(false);
    this.Servicio.nextMessage(this.usuario);
    this.Servicio.sharedMessage2.subscribe(message2 => this.logeado = message2);
  }

  sendMessageFather(){
    this.messageEvent.emit(this.registro);
  }


  comprobar(){
    const params= new HttpParams().set('nick',this.nomUsuario).set('pass',btoa(this.contrasena));
    this.http.get(this.Servicio.URL_API + '/user/logIn',{params}).subscribe(
      (resp:User) => { this.logeado=true;this.usuario=resp;this.correctoNick= resp.nick;console.log(resp.nick);
        //this.Servicio.establecerLogin(resp);
        this.Servicio.nextMessage(resp);
        this.Servicio.nextMessage2(true);
        },
      (error:string)=> {this.aviso=true;});

  }

}
