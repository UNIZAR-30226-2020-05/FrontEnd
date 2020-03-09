import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReproductorComponent } from './reproductor/reproductor.component';
import { PanelSocialComponent } from './panel-social/panel-social.component';

@NgModule({
  declarations: [
    AppComponent,
    ReproductorComponent,
    PanelSocialComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
