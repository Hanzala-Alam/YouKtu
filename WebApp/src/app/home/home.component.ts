import { Component } from '@angular/core';
import {ThemesService} from '../Theme/themes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  _themes:ThemesService;
  constructor(private themes:ThemesService){
    this._themes = themes;
  }
}
