import { animate, transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { delay, timer } from 'rxjs';
import {ThemesService} from '../Theme/themes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public themes:ThemesService) { 
    this._themes = themes;
  }
  _themes:ThemesService;

  toggleThemesMode(){
    this._themes.toggleThemesMode();
  }
  ngOnInit(): void {
  }
}
