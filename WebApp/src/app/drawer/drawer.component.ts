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
  
  isLeftNavOpen = false;
  toggleLeftNav() {
    this.isLeftNavOpen = !this.isLeftNavOpen;
    this.themes.isLeftNavOpen = this.isLeftNavOpen;
    const leftNav = document.querySelector('.left-nav');
    leftNav?.classList.toggle('closed');
  }
}
