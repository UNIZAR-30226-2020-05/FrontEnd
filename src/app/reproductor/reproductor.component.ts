import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {Album, Cancion, Podcast, User} from '../app.component';
import {HttpClient, HttpParams} from '@angular/common/http';


@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

  activo; // Indica si hay una cancion en reproducción activa
  temaEnCola;
  volumenAux;
  cancion = new Audio();
  duracionActual;
  logeado;



  // Posición de la cancion
  posActual: number;
  usuarioActual: User;

  public listaActiva: Array<Cancion>;

  // Posición de la reproducción en lista
  posicion = 0;
  cancionActual: Cancion;
  srcActual;
  navVersion = navigator.userAgent.indexOf('Chrome') > -1;
  a = false;
  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
    this.logeado = false;
    this.cancionActual = new Cancion();

    /* Se establecen variables que deben actualizar por sí solas */
    setInterval(() => {
      this.posActual = this.cancion.currentTime;
      this.duracionActual = this.cancion.duration;
      if (this.cancion.ended && this.listaActiva.length < 2) {
        this.cancion.currentTime = 0; // Vuelve al principio
        this.cancion.load(); const aux = this.cancion.src;
        this.cancion.src = aux;
      }
    }, 300);

    setInterval(() => {
      if ((this.posActual === this.duracionActual) && this.cancion.ended) {
        this.avanzarLista();
      }
    }, 2000);

    setInterval(() => {
      if (this.activo) {
        this.actualizarUltimaEscucha(this.cancionActual);
      }
    }, 12000);


  }


  ngOnInit(): void {
    this.activo = false;

    this.Servicio.sharedMessage2.subscribe(message2 => {
      this.cancion.pause(); // Si cierra sesión, debe parar la reproducción.
    });

    /* Recibe y actualiza cancion, podcast o lista a reproducir */ // Así chuta. No tocar.
    this.Servicio.cancionActiva.subscribe((listCan)  => {
      if (listCan != null) {
        /* Guarda la lista de reproducción */
        this.listaActiva = listCan;
        /* Comienza desde el principio */
        const aux = this.listaActiva[0];
        this.posicion = 0;
        this.cancionActual = aux;
        this.cargarAudio(aux);
        }
      });

    // Recibe el objeto usuario, y actualiza cuando se cambia.
    this.Servicio.sharedMessage.subscribe(userRecibido => {
      if (userRecibido.id_ultima_reproduccion != null && userRecibido.minuto_ultima_reproduccion != null) {
        if(userRecibido.tipo_ultima_reproduccion === 0) { //Si es cancion

          const params = new HttpParams().set('name', '');
          this.http.get(this.Servicio.URL_API + '/song/getByName', {params})
            .subscribe(
              (resp: Array<Cancion>) => {

                let encontrado = false;
                for (const cancionc of resp) {
                  if (!encontrado) {
                    if (cancionc.id === userRecibido.id_ultima_reproduccion) {
                      const params = new HttpParams().set('titulo', cancionc.album.toString());
                      this.http.get(this.Servicio.URL_API + '/album/getByTitulo', {params})
                        .subscribe(
                          (alb: Array<Album>) => {
                            this.Servicio.enviarAlbumPlay(alb[0]);
                          }
                        );
                      this.Servicio.enviarAlbumPlay(cancionc.album);
                      this.Servicio.reproducirCancion(cancionc);
                      this.cancion.src = this.Servicio.URL_API + '/song/play/' + cancionc.name;
                      this.cancion.load();
                      console.log(this.cancion.currentTime + ' -- ' + this.cancion.duration);
                      this.cancion.currentTime = userRecibido.minuto_ultima_reproduccion;

                      encontrado = true;
                    }
                  }
                }
              }

          );
      }} else if (userRecibido.tipo_ultima_reproduccion === 1) {
        { //Si es podcast. SIN PROBAR!!!!

          const params = new HttpParams().set('name', '');
          this.http.get(this.Servicio.URL_API + '/podcast/getByName', {params})
            .subscribe(
              (resp: Array<Podcast>) => {

                let encontrado = false;
                for (const cancionc of resp) {
                  if (!encontrado) {
                    if (cancionc.id === userRecibido.id_ultima_reproduccion) {
                      this.Servicio.enviarAlbumPlay('esPODCAST'); // Dibujar img podcast.
                      this.Servicio.reproducirPodcast(cancionc);
                      this.cancion.src = this.Servicio.URL_API + '/podcast/play/' + cancionc.name;
                      this.cancion.load();
                      console.log(this.cancion.currentTime + ' -- ' + this.cancion.duration);
                      this.cancion.currentTime = userRecibido.minuto_ultima_reproduccion;
                      encontrado = true;
                    }
                  }
                }
              }

            );
        }
      }
      this.usuarioActual = userRecibido;
    });



  }


  conector(can: Array<Cancion>) {

  }

  cargarAudio(orig: Cancion) { // Recibe canciones y podcast CONVERTIDOS
    let url: string;
    if (orig.album === 'esPODCAST') {
      // Detecta que es un podcast.
      url = this.Servicio.URL_API + '/podcast/play/' + orig.name;
    }
    else {
      // Es una cancion.
      url = this.Servicio.URL_API + '/song/play/' + orig.name;
    }
    this.cancion.src = url;
    //this.cancion.currentTime = 0;
    this.temaEnCola = 'TestLong';
    this.cancion.load();
    this.cancion.play();
    this.Servicio.establecerCancionActual(orig);
  }

  avanzarLista() { // Así no peta
    if (this.posicion + 1 < this.listaActiva.length) {
      this.posicion += 1;
      this.cargarAudio(this.listaActiva[this.posicion]);
      this.cancionActual = this.listaActiva[this.posicion];
      this.cancion.load();
      this.cancion.play();
    }
  }

  retrocederLista() {
    if (this.posicion > 0) {
      this.posicion -= 1;
      this.cargarAudio(this.listaActiva[this.posicion]);
      this.cancionActual = this.listaActiva[this.posicion];
      this.cancion.load();
      this.cancion.play();
    }
  }

  hayAtras() {
    if  (this.listaActiva != null) {
      if (this.listaActiva.length > 1 && this.posicion !== 0) { return true; }
    }
    return false;
  }

  hayAdelante() {
    if  (this.listaActiva != null) {
      if (this.posicion + 1 < this.listaActiva.length) { return true; }
    }
    return false;
  }


  playPause() {
    console.log(this.listaActiva);
    if (this.cancion.paused) {
      this.cancion.play();
      this.activo = true;

    } else {
      this.cancion.pause();
      this.activo = false;
    }
    this.actualizarUltimaEscucha(this.cancionActual);
  }

  actualizarUltimaEscucha(can: Cancion) { // tipo_play 0 = CANCION, 1 = PODCAST
     const n: number = can.id;
     const data: FormData = new FormData();
     data.append('id_play', can.id.toString());
     data.append('minuto_play', this.posActual.toFixed());
     if (this.cancionActual.album[0] === 'esPODCAST') {
       data.append('tipo_play', '1');
     }
     else { data.append('tipo_play', '0');  }
     let usu: User = new User();
     this.Servicio.sharedMessage.subscribe(userRecibido => usu = userRecibido);
     console.log(usu);
     this.http.patch( this.Servicio.URL_API + '/user/modifyLastPlay/' + usu.id, data ).subscribe(
       (resp: string) => { console.log(resp); } );


  }




  audioStop() {
    }

  bajarVolumen() {
    if (this.cancion.volume > 0.0) {
      this.cancion.volume -= 0.2;
    }
  }

  subirVolumen() {
    if (this.cancion.volume < 1.0) {
      this.cancion.volume += 0.2;
    }
  }

  muteVolumen() {
    if (this.cancion.volume < 0.01) {
      this.cancion.volume = this.volumenAux;
    } else {
      this.volumenAux = this.cancion.volume;
      this.cancion.volume = 0.0;
    }
  }

  sacarTiempo(n: number) {
    let s = '';
    let auxMin; let auxSeg;
    auxMin = Math.floor(n / 60);
    auxSeg = Math.floor(n % 60);
    if (auxMin < 10) { s += '0'; }
    s += auxMin.toString() + ':';
    if (auxSeg < 10) { s += '0'; }
    s += auxSeg.toString();
    return s;
  }


}
