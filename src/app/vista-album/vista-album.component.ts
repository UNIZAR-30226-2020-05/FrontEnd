import {Component, OnInit,Input, Output} from '@angular/core';
import {ServicioComponentesService} from "../servicios/servicio-componentes.service";

@Component({
  selector: 'app-vista-album',
  templateUrl: './vista-album.component.html',
  styleUrls: ['./vista-album.component.css']
})
export class VistaAlbumComponent implements OnInit {

  lista = ['Primo Victoria', 'Reign of Terror', 'Wolfpack','Counterstrike', 'Stalingrad', 'Into the Fire',
    'Purple Heart', 'Metal Machine','Counterstrike 2', 'Metal Machine','Counterstrike 2','Counterstrike 2', 'Metal Machine'];

  //
  contador: number = 0;
  artistaAlbum: string = 'Sabaton'
  constructor(private Servicio: ServicioComponentesService) { }

  show:boolean;
  ngOnInit(): void {
    this.Servicio.sharedMessage3.subscribe(message3 => this.show = message3);
  }


}
