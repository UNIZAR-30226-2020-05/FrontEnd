import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpParams } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReproductorComponent } from './reproductor/reproductor.component';
import { PanelSocialComponent } from './panel-social/panel-social.component';
import { PanelListasComponent } from './panel-listas/panel-listas.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { CentralComponent } from './central/central.component';
import { VistaAlbumComponent } from './vista-album/vista-album.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    ReproductorComponent,
    PanelSocialComponent,
    PanelListasComponent,
    RegistroComponent,
    LoginComponent,
    CentralComponent,
    VistaAlbumComponent,
    BusquedaComponent,
    EditarUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
