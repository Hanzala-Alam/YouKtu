import { Component,Renderer2 } from '@angular/core';
import {PlayerServicesService} from '../../Services/player-services.service';
import {MediaPlayerComponent} from '../media-player.component';

@Component({
  selector: 'app-player-notification',
  templateUrl: './player-notification.component.html',
  styleUrls: ['./player-notification.component.scss']
})
export class PlayerNotificationComponent {
  _playerService:PlayerServicesService;
  
  constructor(private playerService:PlayerServicesService, private mediaPlayer:MediaPlayerComponent){
    this._playerService = playerService;
  }
}
