import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReproductorComponent } from './reproductor/reproductor.component';
import { PanelSocialComponent } from './panel-social/panel-social.component';
import { PanelListasComponent } from './panel-listas/panel-listas.component';

@NgModule({
  declarations: [
    AppComponent,
    ReproductorComponent,
    PanelSocialComponent,
    PanelListasComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
