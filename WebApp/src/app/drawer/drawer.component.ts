import { Component } from '@angular/core';
import {ThemesService} from '../Theme/themes.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  _themes:ThemesService;

  constructor(private themes:ThemesService){
    this._themes = themes;
  }

  toggleLeftNav() {
    this._themes.toggleLeftNav();
  }
}
