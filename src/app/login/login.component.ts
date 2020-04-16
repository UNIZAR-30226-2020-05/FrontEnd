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
  nomUsuario:string;
  contrasena:string;
  correctoNick:string;
  correctoPass: string;


  public URL_API = 'http://localhost:8080';


  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.nomUsuario='';
    this.contrasena='';
  }

  ngOnInit(): void {
    this.logeado=false;
  }

  sendMessageFather(){
    this.messageEvent.emit(this.registro);
  }

  usuario:User;
  comprobar(){
    const params= new HttpParams().set('nick',this.nomUsuario).set('contrasena',btoa(this.contrasena));
    this.http.get(this.URL_API + '/user/logIn',{params}).subscribe(
      (resp:User) => { this.logeado=true; this.correctoNick= resp.nick;console.log(resp.nick);},
      (error:string)=> {this.aviso=true;});

    /*subscribe(
      data => { console.log(data.nick);this.correctoNick=data.nick;this.correctoPass=data.contrasena});
    if( this.correctoNick != this.nomUsuario || atob(this.correctoPass)!= this.contrasena){  /*AQUI ANTES PONIA != 'ok' U FUNCIONABA CUANDO NO ESTABA EN BASE DE DATAOS*/
     /* this.aviso=true;*/
   /* }
    else{
     /* this.logeado=true;
    }*/

  }
}
