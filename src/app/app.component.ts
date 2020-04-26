import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
}


/* Definición de modelos del sistema */
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

  lista_cancion: Array<String>;
  amigos: Array<User>;


  constructor() {
  this.amigos = new Array<User>();
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

export class Cancion {
  id: number;
  nombre: string;
  fecha_subida: Date;
  duracion: number; //Duración de la canción (en segundos)
  album: Album;
  artistas: Array<Artista>;
  cancionDeListas: Array<ListaCancion>;

  constructor() {
    this.artistas = new Array<Artista>();
    this.cancionDeListas = new Array<ListaCancion>();
  }
}

export class CancionRequest {
  nombre: string;
  fecha_subida: Date;
  duracion: number; //Duración de la canción (en segundos)
}

export class ListaCancion {
  id: number;
  nombre: string;
  usuario: User;
  canciones: Array<Cancion>;

  constructor() {
    this.canciones = new Array<Cancion>();
  }

}

export class Artista {

  id: number;
  nombre: string;
  imagen: string;
  albumes: Array<Album>;
  canciones: Array<Cancion>;

  constructor() {
    this.albumes = new Array<Album>();
    this.canciones = new Array<Cancion>();
  }
}

export class Album {
  id: number;
  titulo: string;
  caratula: string;
  artista: Artista;
  canciones: Array<Cancion>;
}

export class AlbumRequest {
  id: number;
  titulo: string;
  caratula: string;
  canciones: CancionRequest[];
}

