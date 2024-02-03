import { Component,OnInit, ElementRef, Renderer2,HostListener  } from '@angular/core';
import {PlayerServicesService} from '../../Services/player-services.service';
import {MediaPlayerComponent} from '../media-player.component';

@Component({
  selector: 'app-volume-changer',
  templateUrl: './volume-changer.component.html',
  styleUrls: ['./volume-changer.component.scss']
})
export class VolumeChangerComponent{
  _playerService:PlayerServicesService;
  _mediaPlayer:MediaPlayerComponent;
  volumeLevel: number = 1;
  mouseMoveListener: Function | null = null;
  mouseUpListener: Function | null = null;
  

  constructor(private playerService:PlayerServicesService, private mediaPlayer:MediaPlayerComponent,private renderer: Renderer2, private elementRef: ElementRef) {
    this._playerService = playerService;
    this.volumeLevel = this._playerService.volume * 80;
    this._mediaPlayer = mediaPlayer;
  }

  ngOnInit() {
    const volumeSlider = this.elementRef.nativeElement.querySelector('.volume-slider');

    this.renderer.listen(volumeSlider, 'mousedown', (event) => {
      event.preventDefault();
      this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (mouseEvent) => this.adjustVolume(mouseEvent));
      this.mouseUpListener = this.renderer.listen('document', 'mouseup', () => this.stopAdjustingVolume());
    });

    const mutebutton = document.getElementById("volume-button");
    mutebutton?.addEventListener("click", ()=> this.toggleMute());
  }

  adjustVolume(event: MouseEvent) {
    const volumeSlider = this.elementRef.nativeElement.querySelector('.volume-slider');
    const newPosition = event.clientX - volumeSlider.getBoundingClientRect().left;
    const newVolume = newPosition / volumeSlider.offsetWidth;
    this._playerService.volume = Math.max(0, Math.min(1, newVolume));
    this._playerService.setVolumeSetting();
    this._mediaPlayer.adjustVolume(this._playerService.volume);
    this.volumeLevel = this.playerService.volume * 80;
  }

  stopAdjustingVolume() {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
      this.mouseMoveListener = null;
    }
    if (this.mouseUpListener) {
      this.mouseUpListener();
      this.mouseUpListener = null;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.stopAdjustingVolume();
  }

  toggleMute() {
    this._playerService.setVolumeMute();
    this._mediaPlayer.adjustVolume(this._playerService.volume);
    this.volumeLevel = this.playerService.volume * 80;
  }
}
