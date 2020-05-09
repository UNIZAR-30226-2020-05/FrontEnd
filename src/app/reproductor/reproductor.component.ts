import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {Cancion, User} from '../app.component';
import {HttpClient} from '@angular/common/http';


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

  a = false;
  constructor(private http: HttpClient, public Servicio: ServicioComponentesService) {
    this.logeado = false;
    this.cancionActual = new Cancion();

    /* Se establecen variables que deben actualizar por sí solas */
    setInterval(() => {
      this.posActual = this.cancion.currentTime;
      this.duracionActual = this.cancion.duration;
    }, 300);

    setInterval(() => {
      if ((this.posActual === this.duracionActual) && this.cancion.ended) {
        this.avanzarLista();
        console.log('As');
      }
    }, 1200);

    setInterval(() => {
      this.Servicio.actualizarUltimaEscucha(this.cancionActual);
    }, 9999999);


  }


  ngOnInit(): void {
    this.activo = false;

    /* Recibe y actualiza cancion o lista a reproducir */ // Así chuta. No tocar.
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
        //console.log('con registro');
      }
      this.usuarioActual = userRecibido;
    });



  }

  conector(can: Array<Cancion>) {

  }

  cargarAudio(orig: Cancion) {

    this.cancion.src = this.Servicio.URL_API + '/song/play/' + orig.name;
    this.cancion.currentTime = 0;
    this.temaEnCola = 'TestLong';
    this.cancion.load();
    this.cancion.play();
    this.Servicio.establecerCancionActual(orig);
  }

  avanzarLista() { // Así no peta
    if (this.posicion + 1 < this.listaActiva.length) {
      this.posicion += 1;
      this.cargarAudio(this.listaActiva[this.posicion])
      this.cancionActual = this.listaActiva[this.posicion];
      this.cancion.load();
      this.cancion.play();
    }
  }

  retrocederLista() {
    if (this.posicion > 0) {
      this.posicion -= 1;
      this.cargarAudio(this.listaActiva[this.posicion])
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
      if (this.posicion+1 < this.listaActiva.length) { return true; }
    }
    return false;
  }


  playPause() {
    console.log(this.listaActiva)
    if (this.cancion.paused) {
      this.cancion.play();
      this.activo = true;

    } else {
      this.cancion.pause();
      this.activo = false;
    }
    this.Servicio.actualizarUltimaEscucha(this.cancionActual);
  }




  audioStop(){
    }

  bajarVolumen(){
    if (this.cancion.volume > 0.0){
      this.cancion.volume-=0.2;
    }
  }

  subirVolumen(){
    if (this.cancion.volume < 1.0){
      this.cancion.volume+=0.2;
    }
  }

  muteVolumen(){
    if (this.cancion.volume < 0.01){
      this.cancion.volume = this.volumenAux;
    }
    else {
      this.volumenAux = this.cancion.volume;
      this.cancion.volume = 0.0;
    }
  }

  sacarTiempo(n: number){
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
