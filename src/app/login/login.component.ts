import { Component,Output,EventEmitter,OnInit} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';
import {User, UserRequest} from '../app.component';
import {observable} from "rxjs";
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
  nomUsario:string;
  contrasena:string;
  correcto:string;


  public URL_API = 'http://localhost:3308';


  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.nomUsario='';
    this.contrasena='';
  }

  ngOnInit(): void {
    this.logeado=false;
  }

  sendMessageFather(){
    this.messageEvent.emit(this.registro);
  }

  comprobar(){
    const params= new HttpParams().set('usuario',this.nomUsario).set('pass',btoa(this.contrasena));
    this.http.get(this.URL_API + '/user/logIn',{params}). subscribe(
      (resp: string) => { this.correcto= resp } );
    if(this.correcto != "OK"){  /*AQUI ANTES PONIA != 'ok' U FUNCIONABA CUANDO NO ESTABA EN BASE DE DATAOS*/
      this.aviso=true;
    }
    else{
      this.logeado=true;
    }

  }
}
