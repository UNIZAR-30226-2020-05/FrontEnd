import { Component, OnInit } from '@angular/core';


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
  logeado;
  constructor() { this.logeado=false;}


  gestionSonido(){
    this.cancion.src = '../../assets/media/test.mp3';
    this.temaEnCola = 'TestLong';
    this.cancion.load();
  }

  avanzarLista(){
    if (this.temaEnCola == 'Test'){
      this.cancion.src = '../../assets/media/test.mp3';
      this.temaEnCola = "TestLong"; //Siguiente a cargar
      this.activo = true;
    }
    if (this.temaEnCola == 'TestRemoto'){
      this.cancion.src = 'https://ro01-sycdn.kuwo.cn/resource/n3/83/80/1909245563.mp3';
      this.temaEnCola = 'Test';
      this.activo = true;
    }
    else {
      this.cancion.src = "../../assets/media/testLong.mp3";
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

  mostrarTiempo(){
    return this.cancion.currentTime;
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
}
