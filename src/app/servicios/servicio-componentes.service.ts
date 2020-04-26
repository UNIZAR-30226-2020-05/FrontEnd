import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User, UserRequest} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ServicioComponentesService {

   nuevo: User;
   login = false;
   vistaAlbum: boolean;
   editUser: boolean;
   //central: boolean;

  /* Mensaje para pasar usuario */
  private message = new BehaviorSubject(this.nuevo);
  sharedMessage = this.message.asObservable();

  /* Mensaje para pasar variable de login */
  private message2 = new BehaviorSubject(this.login);
  sharedMessage2 = this.message2.asObservable();

  /* Mensaje para variable vista de album */
  private message3 = new BehaviorSubject(this.vistaAlbum);
  sharedMessage3 = this.message3.asObservable();

  /* Mensaje para pasar variable a editar usuario */
  private messageEdit = new BehaviorSubject(this.editUser);
  sharedMessageEdit = this.messageEdit.asObservable();

  /* Mensaje para pasar variable a la vista central */
  /*private messageCentral = new BehaviorSubject(this.central);
  sharedMessageCentral = this.messageCentral.asObservable();*/

  constructor() { }

  nextMessage(message) {
    this.message.next(message);
  }

  nextMessage2(message2) {
    this.message2.next(message2);
  }

  nextMessage3(message3) {
    this.message3.next(message3);
  }

  nextMessageEdit(messageEdit) {
    this.messageEdit.next(messageEdit);
  }

  establecerLogin(usuario: User) {
    this.nuevo = usuario;
  }

  cargarLogin() {
    return this.nuevo;
  }

  /*nextMessageCentral(messageCentral) {
    this.messageCentral.next(messageCentral);
  }*/

}
