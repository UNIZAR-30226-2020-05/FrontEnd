import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
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
  id_ultima_reproduccion: number;
  minuto_ultima_reproduccion: number;
  tipo_ultima_reproduccion: number;

  lista_cancion: Array<ListaCancion>;
  amigos: Array<Amigo>;


  constructor() {
    this.tipo_user = true; // Usuario por defecto
    this.amigos = new Array<Amigo>();
  }

}

export class UserRequest {
  nombre: string;
  apellidos: string;
  nick: string;
  contrasena: string;
  tipo_user: boolean;
  fecha_nacimiento: string;
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
}

export class Album {
  id: number;
  titulo: string;
  caratula: string;
  artista: Artista;
  canciones: Array<Cancion>;
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


/*export class canciones {
  nombre: string;
  fecha_subida: number;
  album: string;
  artistas: Array<string>;

}*/
