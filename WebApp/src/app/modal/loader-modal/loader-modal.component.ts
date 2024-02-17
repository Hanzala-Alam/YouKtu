import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/Theme/themes.service';

@Component({
  selector: 'app-loader-modal',
  templateUrl: './loader-modal.component.html',
  styleUrls: ['./loader-modal.component.scss']
})
export class LoaderModalComponent implements OnInit {
  _theme:ThemesService;

  constructor(private theme:ThemesService){
    this._theme = theme;
  }

  ngOnInit(): void {
  }

}
