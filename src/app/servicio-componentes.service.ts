import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User, UserRequest} from "./app.component";

@Injectable({
  providedIn: 'root'
})
export class ServicioComponentesService {

   nuevo: User;
   login:boolean=false;

  private message = new BehaviorSubject(this.nuevo);
  sharedMessage = this.message.asObservable();

  private message2= new BehaviorSubject(this.login);
  sharedMessage2= this.message2.asObservable();

  constructor() { }

  nextMessage(message) {
    this.message.next(message);
  }

  nextMessage2(message2){
    this.message2.next(message2);
  }
}
