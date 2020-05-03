import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Album, ListaCancion, User, UserRequest} from '../app.component';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioComponentesService {

  URL_API: string;

  nuevo: User;
  login = false;

  vistaAlbum: boolean;
  albumActiv: Album;

  editUser: boolean;

  lista:ListaCancion;

  // central: boolean;

  /* Mensaje para pasar usuario */
  private message = new BehaviorSubject(this.nuevo);
  sharedMessage = this.message.asObservable();

  /* Mensaje para pasar variable de login */
  private message2 = new BehaviorSubject(this.login);
  sharedMessage2 = this.message2.asObservable();

  /* RELACIONADOS CON ALBUM */

  /* Mensaje para activar vista de album */
  private message3 = new BehaviorSubject(this.vistaAlbum);
  sharedMessage3 = this.message3.asObservable();

  /* Mensaje para pasar el objeto album */
  private albumObj = new BehaviorSubject(this.albumActiv);
  albumActivo = this.albumObj.asObservable();

  /* ----------------------------------------------*/

  /* Mensaje para pasar variable a editar usuario */
  private messageEdit = new BehaviorSubject(this.editUser);
  sharedMessageEdit = this.messageEdit.asObservable();

  /* Mensaje para pasar variable a panel Listas de lista */
  private messageList = new BehaviorSubject(this.lista);
  sharedMessageList = this.messageList.asObservable();

  /* Mensaje para pasar variable a la vista central */
  /*private messageCentral = new BehaviorSubject(this.central);
  sharedMessageCentral = this.messageCentral.asObservable();*/

  constructor(private http: HttpClient) {
    this.URL_API = 'http://localhost:8080';
    this.nuevo = new User();

  }

  nextMessage(message) {
    this.message.next(message);
  }

  nextMessage2(message2) {
    this.message2.next(message2);
  }

  nextMessage3(message3) {
    this.message3.next(message3);
  }

  cargarAlbum(nombre) {
    const params = new HttpParams()
      .set('titulo', nombre);

    this.http.get(this.URL_API + '/album/getByTitulo', {params})
      .subscribe(
        (album: Array<Album>) => {
          this.albumObj.next(album[0]);
        },
        (erroro: string) => {
        }
      );
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

  enviarLista(messageList){
    this.messageList.next(messageList);
  }
  /*nextMessageCentral(messageCentral) {
    this.messageCentral.next(messageCentral);
  }*/

}
