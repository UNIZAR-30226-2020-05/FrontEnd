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
  posActual;
  duracionActual;
  logeado;

  usuarioActual: User;
  cancionActual: Cancion;
  srcActual;

  a = false;
  constructor(private http: HttpClient, private Servicio: ServicioComponentesService) {
    this.logeado = false;
    this.cancionActual = new Cancion();

    /* Se establecen variables que deben actualizar por sí solas */
    setInterval(() => {
      this.posActual = this.cancion.currentTime;
      this.duracionActual = this.cancion.duration;
    }, 250);

    setInterval(() => {
      this.Servicio.actualizarUltimaEscucha(this.cancionActual);
    }, 9999999);
  }


  cargarAudio(orig: Cancion) {
    this.cancionActual = orig;
    this.cancion.src = this.Servicio.URL_API + '/song/play/' + orig.name;
    this.cancion.currentTime = 0;
    this.temaEnCola = 'TestLong';
    this.cancion.load();
    this.cancion.play();
  }

  avanzarLista(){
    if (this.temaEnCola == 'Test'){
      this.cancion.src = this.Servicio.URL_API + '/song/play/testLong';
      this.temaEnCola = 'TestRemoto'; //Siguiente a cargar
      this.activo = true;
    }
    if (this.temaEnCola == 'TestRemoto'){
      this.cancion.src = '/song/play/tulpa';
      this.temaEnCola = 'Test';
      this.activo = true;
    }
    else {
      this.cancion.src = this.Servicio.URL_API + '/song/play/tulpa';
      this.temaEnCola = "TestRemoto";
      this.activo = true;
    }

    this.cancion.load();
    this.cancion.play();
  }

  ngOnInit(): void {
    this.activo = false;
    //Recibe el objeto usuario, y actualiza cuando se cambia.
    this.Servicio.sharedMessage.subscribe(userRecibido => {
      if (userRecibido.id_ultima_reproduccion != null && userRecibido.minuto_ultima_reproduccion != null) {
        console.log('con registro');
      }
      this.usuarioActual = userRecibido;
    })

    this.Servicio.cancionActiva.subscribe((cancionObj ) =>
      (this.cargarAudio(cancionObj))
    ); /*this.cancionActual = cancionObj */
  }

  playPause() {
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
