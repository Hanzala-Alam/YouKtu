import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {ThemesService} from '../Theme/themes.service';
import {ActivatedRoute} from '@angular/router';
import {PlayerServicesService} from '../Services/player-services.service';
@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit, AfterViewInit {
  _themes: ThemesService;
  _playerService: PlayerServicesService
  isPlaying: boolean = false;
  videoElement: HTMLVideoElement;
  isFullScreen: boolean = false;
  duration?: string ;
  currentTime?: string;
  elem:any;
  loadedLength:string="0%";
  seekableDuration:number = 0;
  seekableTime:number= 0;
  isSeeking: boolean = false;
  seekablePercentage: number = 0;
  canplay: any = true;

  constructor(private themes:ThemesService, private playerService:PlayerServicesService, private route:ActivatedRoute, private el:ElementRef, private renderer:Renderer2){
    this._themes = themes;
    this.videoElement = this.el.nativeElement.querySelector('#video') as HTMLVideoElement;
    this._playerService = playerService;
  }
  ngAfterViewInit(): void {
    this.videoElement = this.el.nativeElement.querySelector('#video') as HTMLVideoElement;
    this.renderer.listen(this.videoElement, 'loadeddata', () => {
      // Video has loaded, perform initialization here
      this.duration = this.getFormattedDuration(this.videoElement.duration);
      this.togglePlayPause();
      this.videoElement.volume = this._playerService.volume;
      // You can add any additional initialization logic here
    });

    // Listen for the timeupdate event
    this.renderer.listen(this.videoElement, 'timeupdate', () => {
      this.currentTime = this.getFormattedDuration(this.videoElement.currentTime);
      this.seekablePercentage = (this.videoElement.currentTime * 100 / this.videoElement.duration);
    });

    // this.renderer.listen(this.videoElement,'loadedmetadata',()=>{
    //   this.getSeekableDuration();
    // });

    this.renderer.listen(this.videoElement,'progress',()=>{
      this.getSeekableDuration();
    });
  }

  togglePlayPause(): void {
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    
    if (videoElement.paused) {
      videoElement.play();
      this.isPlaying = true;
    } else {
      videoElement.pause();
      this.isPlaying = false;
    }
  }

  globalListenFunc: any;
  ngOnInit(): void {
    this.elem = document.documentElement;
    document.addEventListener('fullscreenchange', ()=>{
      if(!document.fullscreenElement){
        this.isFullScreen = false;
      }
    });

    this.globalListenFunc = this.renderer.listen('document', 'keypress', e => {
      if(e.keyCode === 32){
        this.togglePlayPause();
      }
      else if(e.keyCode == 102){
        this.toggleFullScreen();
      }
    });

    this.globalListenFunc = this.renderer.listen('document', 'keydown', e => {
      if(e.keyCode === 37){
        this.Last10();
      }

      else if(e.keyCode == 39){
        this.Next10();
      }
    });

    const a = document.getElementById("video");
    // a?.addEventListener('mousedown',()=>{this.m()});
    a?.addEventListener("click", ()=>{this.togglePlayPause();});
  }

  Last10(){
    if(this.videoElement.currentTime > (this.videoElement.currentTime - 10)){
      this.videoElement.currentTime = this.videoElement.currentTime-10;
    }else{
      this.videoElement.currentTime = 0;
    }
  }

  Next10(){
    if(this.videoElement.duration > (this.videoElement.currentTime + 10)){
      this.videoElement.currentTime = this.videoElement.currentTime + 10;
    }else{
      this.videoElement.currentTime = this.videoElement.duration;
    }
  }

  getFormattedDuration(duration:number): string {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  ngOnDestroy(): void {
    // Clean up event listeners when the component is destroyed
    this.renderer.removeClass(this.videoElement, 'timeupdate');
    // this.renderer.removeClass(this.videoElement, 'loadedmetadata');
    this.renderer.removeClass(this.videoElement, 'progress');
  }

  toggleFullScreen(): void {
    if (!this.isFullScreen) {
      // this.videoElement.requestFullscreen();
      this.elem.requestFullscreen();
      var playerContainer = document.getElementsByClassName("player-container");
      
      // Enter fullscreen mode
      // if (this.videoElement.requestFullscreen) {
      //   this.videoElement.requestFullscreen();
      // }
      // else if (this.videoElement.mozRequestFullScreen) {
      //   this.videoElement.mozRequestFullScreen();
      // } else if (this.videoElement.webkitRequestFullscreen) {
      //   this.videoElement.webkitRequestFullscreen();
      // } else if (this.videoElement.msRequestFullscreen) {
      //   this.videoElement.msRequestFullscreen();
      // }
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      // else if (document.mozCancelFullScreen) {
      //   document.mozCancelFullScreen();
      // } else if (document.webkitExitFullscreen) {
      //   document.webkitExitFullscreen();
      // } else if (document.msExitFullscreen) {
      //   document.msExitFullscreen();
      // }
    }

    // Toggle the fullscreen status
    this.isFullScreen = !this.isFullScreen;
  }

  getSeekableDuration(): void {
    // Get the seekable ranges of the video
    const seekable = this.videoElement.seekable;
    if (seekable && seekable.length > 0) {
      const seekableStart = seekable.start(0); // Start time of the first seekable range
      const seekableEnd = seekable.end(0); // End time of the first seekable range
      const seekableDuration = seekableEnd - seekableStart;
      this.seekableTime = (this.seekableTime + seekableDuration / 100) / 100;
      this.seekableDuration = this.seekableTime;
    } else {
      this.seekableTime = 0;
      this.seekableDuration = this.seekableTime;
    }
  }

  onSeekMouseDown(event: MouseEvent): void {
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    const d = document.getElementById('seekable') as HTMLDivElement;
    const offsetX = (event.clientX - rect.left);
    const percentage = (offsetX / d.offsetWidth) * 100;
    this.seekablePercentage = percentage;
    const seekTime = (this.seekablePercentage / 100) * this.videoElement.duration;
    this.videoElement.currentTime = seekTime;
  }

  // m(){
  //   setTimeout(() => {
  //     this.canplay = false;
  //     this.videoElement.playbackRate += 1;
  //   }, 300);
  // }

  adjustVolume(volume:number):void{
    if(!this.canplay){return;}
    this.videoElement.volume = volume;
  }
}
