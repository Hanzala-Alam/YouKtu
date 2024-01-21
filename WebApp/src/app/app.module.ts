import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DrawerComponent } from './drawer/drawer.component';
import { HomeComponent } from './home/home.component';
import { MovieCardComponent } from './cards/movie-card/movie-card.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DrawerComponent,
    HomeComponent,
    MovieCardComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
