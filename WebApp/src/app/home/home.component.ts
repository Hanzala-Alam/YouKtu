import { Component } from '@angular/core';
import {ThemesService} from '../Theme/themes.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  _themes:ThemesService;
  constructor(private themes:ThemesService,public dialog: MatDialog){
    this._themes = themes;
    // setTimeout(()=>{
    //   const dialogRef = this.dialog.closeAll();
    // },1000);
  }
}
