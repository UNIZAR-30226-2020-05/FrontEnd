import { Component, OnInit } from '@angular/core';
import {ServicioComponentesService} from '../servicios/servicio-componentes.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.css']
})
export class CentralComponent implements OnInit {
  mostrar: boolean = true;

  constructor(private http: HttpClient, private Servicio: ServicioComponentesService) { }

  ngOnInit(): void {
    this.mostrar = true;
    this.Servicio.sharedMessageCentral.subscribe(messageCentral => this.mostrar = messageCentral);
  }

}
