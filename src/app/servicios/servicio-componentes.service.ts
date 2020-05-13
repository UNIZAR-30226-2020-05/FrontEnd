import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Album, Cancion, ListaCancion, Podcast, User, UserRequest} from '../app.component';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioComponentesService {

  URL_API: string;

  nuevo: User = new User();
  login = false;

  vistaAlbum: boolean;
  albumActiv: Album;
  albumCancionActiva: Album;

  editUser: boolean;

  lista:ListaCancion;
  vistaLista:boolean;
  objLista: ListaCancion;
  listaBorrar;
  favLista: boolean;
  favListaP: boolean;

  central: boolean;

  vistaUsuario: boolean;

   /* --- Servicio reproducción de canciones ---- */

  listaReprActiva: Cancion[]; // Así chuta. No tocar.
  cancionActiv: Cancion = new Cancion();


  /* --------------------------------------------- */
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

  /*Mensahe para enviar obj album a panel listas para vista de caratula pequeña */
  private albumCanActv = new BehaviorSubject(this.albumCancionActiva);
  albumReprod = this.albumCanActv.asObservable();

  /* ----------------------------------------------*/
  /* Mensaje para la cancion actual */
  public cancionAct = new BehaviorSubject(this.cancionActiv);
  public canActiva = this.cancionAct.asObservable();

  /* Mensaje para la lista de canciones actual */
  public cancionObj = new BehaviorSubject(this.listaReprActiva);
  public cancionActiva = this.cancionObj.asObservable();

  /* Mensaje para pasar variable a editar usuario */
  private messageEdit = new BehaviorSubject(this.editUser);
  sharedMessageEdit = this.messageEdit.asObservable();

  /************RELACIONADOS CON PANEL LISTAS ****************/
  /* Mensaje para pasar variable a panel Listas de lista */
  private messageList = new BehaviorSubject(this.lista);
  sharedMessageList = this.messageList.asObservable();

  /* Mensaje para pasar variable que active o desactive la vista-lista*/
  private messageVistaLista = new BehaviorSubject(this.vistaLista);
  sharedMessageVistaLista= this.messageVistaLista.asObservable();

  /*Mensjae para pasar objeto lista ha vista-lista */
  private messageObjetoLista = new BehaviorSubject(this.objLista);
  sharedMessageObjLista = this.messageObjetoLista.asObservable();

  /* Mensaje para poder ocultar vista de favoritos Canciones desde logo */
  private messageFavLista = new BehaviorSubject(this.favLista);
  sharedMessageFavLista = this.messageFavLista.asObservable();

  /* Mensaje para poder ocultar vista de favorito Podcasts desde logo */
  private messageFavListaP = new BehaviorSubject(this.favListaP);
  sharedMessageFavListaP = this.messageFavListaP.asObservable();


  /*Mensaje para mandar array de listas de usuario con lista  ya borrada*/
  private messageListaBorrar = new BehaviorSubject(this.listaBorrar);
  sharedMessageBorrarLista = this.messageListaBorrar.asObservable();


  /* Mensaje para pasar variable a la vista central */
  private messageCentral = new BehaviorSubject(this.central);
  sharedMessageCentral = this.messageCentral.asObservable();

  /*********PARA VISTA USUARIO*************/
  private messageVistaUsuario = new BehaviorSubject(this.vistaUsuario);
  sharedMessageVistaUsuario = this.messageVistaUsuario.asObservable();


  constructor(private http: HttpClient) {
    this.URL_API = 'http://3.22.247.114:8080';
    this.nuevo = new User();
    this.objLista = new ListaCancion();
    this.albumActiv = new Album();
    this.albumCancionActiva = new Album();
    this.listaBorrar = new Array(ListaCancion);
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

  reproducirCancion(can: Cancion) {
    const nuev = new Array<Cancion>();
    nuev.push(can);
    console.log(nuev);
    this.reproducirLista(nuev);
  }

  reproducirPodcast(pod: Podcast) {
    const transform: Cancion = {
      id: pod.id,
      name: pod.name,
      fecha_subida: pod.fecha_subida,
      duracion: pod.duracion,
      artistas: new Array<string>(),
      album: 'podcast'
    };
    const nuev = new Array<Cancion>();
    nuev.push(transform);
    console.log(nuev);
    this.reproducirLista(nuev);
  }

  establecerCancionActual(cancionAct) {
    this.cancionAct.next(cancionAct);
  }

  reproducirLista(cancionObj) {
    this.cancionObj.next(cancionObj);
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

  /* Sobre listas */

  enviarLista(messageList){
    this.messageList.next(messageList);
  }

  nextMessageVistaLista(messageVistaLista){
    this.messageVistaLista.next(messageVistaLista);
  }

  nextMessageObjLista(messageObjLista){
    this.messageObjetoLista.next(messageObjLista);
  }

  nextMessageFavList(favLista){
    this.messageFavLista.next(favLista);
  }

  nextMessageFavListP(favListaP){
    this.messageFavListaP.next(favListaP);
  }

  nextMessageListaBorrada(messageListaBorrar){
    this.messageListaBorrar.next(messageListaBorrar);
  }

  /*nextMessageCentral(messageCentral) {
    this.messageCentral.next(messageCentral);
  }*/


  enviarAlbumPlay(albumCanActv){
    this.albumCanActv.next(albumCanActv);
  }

  activarVistaUsuario(vistaUsuario){
    this.messageVistaUsuario.next(vistaUsuario);
  }
}
