import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';


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
  posicionActual;

  a = false;
  constructor(private Servicio: ServicioComponentesService) {
    this.logeado=false;
    /* Se establecen variables que deben actualizar por sí solas */
    setInterval(() => {
      this.posActual = this.cancion.currentTime;
      this.duracionActual = this.cancion.duration;
    }, 250);
  }


  gestionSonido(){
    this.cancion.src = this.Servicio.URL_API + '/song/play/test';
    this.temaEnCola = 'TestLong';
    this.cancion.load();
  }

  avanzarLista(){
    if (this.temaEnCola == 'Test'){
      this.cancion.src = this.Servicio.URL_API + '/song/play/testLong';
      this.temaEnCola = "TestLong"; //Siguiente a cargar
      this.activo = true;
    }
    if (this.temaEnCola == 'TestRemoto'){
      this.cancion.src = 'https://ro01-sycdn.kuwo.cn/resource/n3/83/80/1909245563.mp3';
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
    this.gestionSonido();
  }

  playPause() {
    if (this.activo) {
      this.cancion.pause();
      this.activo = false;
    } else {
      this.cancion.play();
      this.activo = true;
    }

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
