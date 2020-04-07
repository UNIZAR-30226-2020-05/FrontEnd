import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vista-album',
  templateUrl: './vista-album.component.html',
  styleUrls: ['./vista-album.component.css']
})
export class VistaAlbumComponent implements OnInit {

  constructor() { }
  show = false;
  ngOnInit(): void {
  }

}
