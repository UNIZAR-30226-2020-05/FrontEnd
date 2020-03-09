import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

  activo; // Indica si hay una cancion en reproducción activa
  tituloActual;
  volumenAux; //Borrar
  volumen : number; // Valor de 0 a 100 de volumen
  ruta;
  cancion = new Audio();
  constructor() { }

  gestionSonido(){
    this.cancion.src = "../../assets/media/test.mp3";
    this.tituloActual = "Test";
    this.cancion.load();
  }

  avanzarLista(){
    if (this.tituloActual=="TestLong"){
      this.cancion.src = "../../assets/media/test.mp3";
      this.tituloActual = "Test";
    }
    else {
      this.cancion.src = "../../assets/media/testLong.mp3";
      this.tituloActual = "TestLong";
    }

    this.cancion.load();
    this.cancion.play();
  }

  ngOnInit(): void {
    this.activo = false;
    this.volumen = 1.0;
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
      this.volumen = this.cancion.volume;
    }
  }

  subirVolumen(){
    if (this.cancion.volume < 1.0){
      this.cancion.volume+=0.2;
      this.volumen = this.cancion.volume;
    }
  }

  muteVolumen(){
    if (this.volumenAux!=0){
      this.volumenAux = this.volumen;
      this.cancion.volume = 0.0;
    }
    else {
      this.volumen = this.volumenAux;
    }

  }
}
