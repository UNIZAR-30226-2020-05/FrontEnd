import {Component, OnInit,Input, Output} from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";
import {Album} from '../app.component';

@Component({
  selector: 'app-vista-album',
  templateUrl: './vista-album.component.html',
  styleUrls: ['./vista-album.component.css']
})
export class VistaAlbumComponent implements OnInit {

  lista = ['Primo Victoria', 'Reign of Terror', 'Wolfpack','Counterstrike', 'Stalingrad', 'Into the Fire',
    'Purple Heart', 'Metal Machine','Counterstrike 2', 'Metal Machine','Counterstrike 2','Counterstrike 2', 'Metal Machine'];

  //
  albActivo: Album;
  artistaAlbum: string = 'Sabaton'
  constructor(private Servicio: ServicioComponentesService) { }

  show:boolean;
  ngOnInit(): void {
    //Flag para saber cuando activar la vista de album
    this.Servicio.sharedMessage3.subscribe(message3 => this.show = message3);

    //Recibe el objeto album, y actualiza cuando se cambia.
    this.Servicio.albumActivo.subscribe(albumObj => this.albActivo = albumObj);
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
