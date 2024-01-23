import { Component, OnInit } from '@angular/core';
import {ThemesService} from '../Theme/themes.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {
  _themes: ThemesService

  constructor(private themes:ThemesService, private route:ActivatedRoute){
    this._themes = themes;
  }

  ngOnInit(): void {
    
  }
}
