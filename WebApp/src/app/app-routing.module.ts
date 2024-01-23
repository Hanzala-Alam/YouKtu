import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PreviewComponent} from './preview/preview.component';
import {MediaPlayerComponent} from './media-player/media-player.component';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"Home", component: HomeComponent},
  {path:"Preview/:id", component: PreviewComponent},
  {path:"MediaPlayer/:id?", component: MediaPlayerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
