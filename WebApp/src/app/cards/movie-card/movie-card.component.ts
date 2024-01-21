import { Component } from '@angular/core';
import {ThemesService} from '../../Theme/themes.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  _themes:ThemesService;
  constructor(private themes:ThemesService){
    this._themes = themes;
  }
}
