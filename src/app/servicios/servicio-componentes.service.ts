import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Album, Cancion, ListaCancion, ListaPodcast, Podcast, User, UserRequest, Artista} from '../app.component';
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
  objAlbum: Album;

  vistaArtista: boolean;
  artistaActiv: Artista;
  albumesArtista: Array<Album>;

  editUser: boolean;

  lista: ListaCancion;
  vistaLista: boolean;
  objLista: ListaCancion;
  listaBorrar;
  favLista: boolean;
  favListaP: boolean;
  usuarioList:User = new User();

  central: boolean;

  busq: boolean;

  vistaUsuario: boolean;
  nomUsuario: string;

  vistaPodcast: boolean;
  objPodcast: ListaPodcast;

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

  /*Mensaje para enviar obj album a panel listas para vista de caratula pequeña */
  private albumCanActv = new BehaviorSubject(this.albumCancionActiva);
  albumReprod = this.albumCanActv.asObservable();

  /* RELACIONADOS CON ARTISTA */

  /* Mensaje para activar vista de artista */
  private messageArtista = new BehaviorSubject(this.vistaArtista);
  sharedMessageArtista = this.messageArtista.asObservable();

  /* Mensaje para pasar el objeto artista */
  private artistaObj = new BehaviorSubject(this.artistaActiv);
  artistaActivo = this.artistaObj.asObservable();

  /* Mensaje para pasar el objeto lista de albumes de artista */
  private albumesArtistaObj = new BehaviorSubject(this.albumesArtista);
  listaAlbumes = this.albumesArtistaObj.asObservable();

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

  /******VISTA DE LISTA CANCION**************/
  /* Mensaje para pasar variable que active o desactive la vista-lista*/
  private messageVistaLista = new BehaviorSubject(this.vistaLista);
  sharedMessageVistaLista = this.messageVistaLista.asObservable();

  /*Mensjae para pasar objeto lista a vista-lista */
  private messageObjetoLista = new BehaviorSubject(this.objLista);
  sharedMessageObjLista = this.messageObjetoLista.asObservable();

  /* Mensaje para pasar el objeto album */
  private objetoAlbum = new BehaviorSubject(this.objAlbum);
  sharedMessageobjAlbum = this.objetoAlbum.asObservable();

  private usuarioLista = new BehaviorSubject(this.usuarioList);
  sharedMessageUsuarioAList = this.usuarioLista.asObservable();

/******** lOGO CERRAR VISTAS***********/
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

  private messageBusq = new BehaviorSubject(this.busq);
  sharedMessageBusq = this.messageBusq.asObservable();

  /*********PARA VISTA USUARIO*************/
  private messageVistaUsuario = new BehaviorSubject(this.vistaUsuario);
  sharedMessageVistaUsuario = this.messageVistaUsuario.asObservable();

  /* Mensaje para pasar variable usuario a vista-usuario */
  private messageNomUsuario = new BehaviorSubject(this.nomUsuario);
  sharedMessageNomUsuario = this.messageNomUsuario.asObservable();


  /************** PARA PODCAST******************/
  /* Mensaje para pasar variable que active o desactive la vista-podcast*/
  private messageVistaPodcast = new BehaviorSubject(this.vistaPodcast);
  sharedMessageVistaPodcast = this.messageVistaPodcast.asObservable();

  /*Mensaje para pasar objeto lista podcast a vista-podcast */
  private messageObjetoPodcast = new BehaviorSubject(this.objPodcast);
  sharedMessageObjPodcast = this.messageObjetoPodcast.asObservable();

  constructor(private http: HttpClient) {
    this.URL_API = 'https://csmback.ddns.net:8443';
    this.nuevo = new User();
    this.objLista = new ListaCancion();
    this.albumActiv = new Album();
    this.albumCancionActiva = new Album();
    this.listaBorrar = new Array(ListaPodcast);
    this.objAlbum = new Album();
    this.usuarioList = new User();
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

  nextMessageArtista(messageArtista) {
    this.messageArtista.next(messageArtista);
  }

  cargarAlbum(nombre) {
    const params = new HttpParams()
      .set('titulo', nombre);

    this.http.get(this.URL_API + '/album/getByTitulo', {params})
      .subscribe(
        (album: Array<Album>) => {
          this.albumObj.next(album[0]);
        },
        (erroro: string) => { console.log(erroro);
        }
      );
  }

  obtenerAlbum(nombre) {


    const params = new HttpParams()
      .set('titulo', nombre);

    this.http.get(this.URL_API + '/album/getByTitulo', {params})
      .subscribe(
        (album: Array<Album>) => {
          this.objetoAlbum.next(album[0]);
        },
        (erroro: string) => { console.log(erroro);
        }
      );
  }
  cargarArtista(nombre) {
    const params = new HttpParams().set('name', nombre);
    this.http.get(this.URL_API + '/artist/getByName', {params})
      .subscribe(
        (artista: Array<Artista>) => {
          this.artistaObj.next(artista[0]);
        },
        (error: string) => {
        }
      );
  }
  cargarAlbumesArtista(id) {
    const params = new HttpParams().set('id_artista', id);
    this.http.get(this.URL_API + '/album/getByArtist', {params})
      .subscribe(
        (resp: Array<Album>) => {
          this.albumesArtistaObj.next(resp);
        },
        (error: string) => {
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
      album: 'esPODCAST'
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


  reproducirListaPodcast(podList: Array<Podcast>) {
    const listCan: Array<Cancion> = new Array<Cancion>();
    for(const pod of podList) {
      const transform: Cancion = {
        id: pod.id,
        name: pod.name,
        fecha_subida: pod.fecha_subida,
        duracion: pod.duracion,
        artistas: new Array<string>(),
        album: 'esPODCAST'
      };
      listCan.push(transform);
      this.reproducirLista(listCan);
    }
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

  enviarLista(messageList) {
    this.messageList.next(messageList);
  }

  nextMessageVistaLista(messageVistaLista) {
    this.messageVistaLista.next(messageVistaLista);
  }

  nextMessageObjLista(messageObjLista) {
    this.messageObjetoLista.next(messageObjLista);
  }

  nextMessageVistaPodcast(messageVistaPodcast) {
    this.messageVistaPodcast.next(messageVistaPodcast);
  }

  nextMessageObjPodcast(messageObjPodcast) {
    this.messageObjetoPodcast.next(messageObjPodcast);
  }

  nextMessageFavList(favLista) {
    this.messageFavLista.next(favLista);
  }

  nextMessageFavListP(favListaP) {
    this.messageFavListaP.next(favListaP);
  }

  nextMessageListaBorrada(messageListaBorrar) {
    this.messageListaBorrar.next(messageListaBorrar);
  }

  nextMessageCentral(messageCentral) {
    this.messageCentral.next(messageCentral);
  }

  nextMessageBusq(messageBusq) {
    this.messageBusq.next(messageBusq);
  }

  enviarAlbumPlay(albumCanActv) {
    this.albumCanActv.next(albumCanActv);
  }

  activarVistaUsuario(vistaUsuario) {
    this.messageVistaUsuario.next(vistaUsuario);
  }

  nextMessageNomUsuario(usuario) {
    this.messageNomUsuario.next(usuario);
  }

  nextMessageUsuarioList(usuario) {
    this.usuarioLista.next(usuario);
  }
}
