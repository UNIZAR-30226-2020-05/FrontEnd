import {Component, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-panel-social',
  templateUrl: './panel-social.component.html',
  styleUrls: ['./panel-social.component.css']
})
export class PanelSocialComponent implements OnInit {

  public URL_API = 'http://localhost:8080';



  listaVacia: boolean;
  mostarBusquedaAmigos: boolean;
  nickBusca: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listaVacia = false;
    this.mostarBusquedaAmigos = false;
  }

  activarBusqueda() {
    this.mostarBusquedaAmigos = true;
  }

  cerrarBusqueda() {
    this.mostarBusquedaAmigos = false;
  }

  buscarAmigo() {
    let params = new HttpParams()
      .set('nick', this.nickBusca);
    return this.http.get(this.URL_API + '/user/get', {params}).subscribe(
      (resp: string) => { console.log(resp); } );;

  }

}
