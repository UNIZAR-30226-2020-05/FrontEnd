import { Component } from '@angular/core';
import construct = Reflect.construct;
import {ServicioComponentesService} from './servicios/servicio-componentes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  constructor( public Servicio: ServicioComponentesService){
  }


}

/* DEFINICIÓN DE MODELOS DEL SISTEMA */

/* Clase User - equivalente a UsuarioDTO en backend */
export class User {
  id: number;
  nombre: string;
  apellidos: string;
  nick: string;
  contrasena: string;
  tipo_user: boolean;
  fecha_nacimiento: string;
  nombre_avatar: string;
  id_ultima_reproduccion: number;
  minuto_ultima_reproduccion: number;
  tipo_ultima_reproduccion: number;
  lista_cancion: Array<ListaCancion>;
  lista_podcast: Array<ListaPodcast>;
  amigos: Array<Amigo>;

  constructor() {
    this.tipo_user = true; // Usuario por defecto
    this.amigos = new Array<Amigo>();
    this.lista_cancion = new Array<ListaCancion>();
    this.lista_podcast = new Array<ListaPodcast>();
  }

}

export class UserRequest {
  nombre: string;
  apellidos: string;
  nick: string;
  contrasena: string;
  tipo_user: boolean;
  fecha_nacimiento: string;
  nombre_avatar: string;
}

/* Clase Cancion - equivalente a CancionDTO en backend */
export class Cancion {
  id: number;
  name: string;
  fecha_subida: Date;
  duracion: number; //Duración de la canción (en segundos)
  album: string;
  artistas: Array<string>;

  constructor() {
    this.artistas = new Array<string>();
  }
}

/* Clase Podcast - equivalente a PodcastDTO en backend */
export class Podcast {
  id: number;
  name: string;
  fecha_subida: Date;
  duracion: number; //Duración de la canción (en segundos)
  artista: string; //Autor del programa de podcast

}

export class PodcastRequest {
  nombre: string;
  fecha_subida: Date;
  duracion: number; //Duración del podcast (en segundos)
}

export class CancionRequest {
  nombre: string;
  fecha_subida: Date;
  duracion: number; //Duración de la canción (en segundos)
}

/* Clase ListaCancion - equivalente a ListaCancionDTO en backend */
export class ListaCancion {
  id: number;
  id_usuario: number;
  nombre: string;
  canciones: Array<Cancion>;

  constructor() {
    this.canciones = new Array<Cancion>();
  }

}

/* Clase ListaPodcast - equivalente a ListaPodcastDTO en backend */
export class ListaPodcast {
  id: number;
  id_usuario: number;
  nombre: string;
  podcasts: Array<Podcast>;

  constructor() {
    this.podcasts = new Array<Podcast>();
  }

}

/* Clase Artista - equivalente a ArtistaDTO en backend */
export class Artista {
  id: number;
  name: string;
  image_path: string;
  albumes: Array<string>;
  canciones: Array<string>;

  constructor() {
    this.albumes = new Array<string>();
    this.canciones = new Array<string>();
  }
}

/* Clase Artista - para nuevas creaciones en backend */
export class ArtistaRequest {
  nombre: string;
  imagen: string;
}

export class Amigo {
  id: number;
  nick: string;
  nombre: string;
  apellidos: string;
  ultimaCancion: string;
  artistaUltimaCancion: string;
}

export class Album {
  id: number;
  titulo: string;
  caratula: string;
  artista: Artista;
  canciones: Array<Cancion>;

  constructor() {
    this.canciones = new Array<Cancion>();
  }
}

/* Clase Album - para nuevas creaciones en backend */
export class AlbumRequest {
  id_artista: number;
  titulo: string;
  caratula: string;
  canciones: CancionRequest[];
}

export class ListaCancionRequest {
  id_usuario: number;
  nombre: string;
}

export class ListaPodcastRequest {
  id_usuario: number;
  nombre: string;
}

/*export class canciones {
  nombre: string;
  fecha_subida: number;
  album: string;
  artistas: Array<string>;

}*/
