import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {ThemesService} from '../Theme/themes.service';
import {ActivatedRoute} from '@angular/router';
import { window } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit, AfterViewInit {
  _themes: ThemesService;
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

  constructor(private themes:ThemesService, private route:ActivatedRoute, private el:ElementRef, private renderer:Renderer2){
    this._themes = themes;
    this.videoElement = this.el.nativeElement.querySelector('#video') as HTMLVideoElement;
  }
  ngAfterViewInit(): void {
    this.videoElement = this.el.nativeElement.querySelector('#video') as HTMLVideoElement;
    this.renderer.listen(this.videoElement, 'loadeddata', () => {
      // Video has loaded, perform initialization here
      this.duration = this.getFormattedDuration(this.videoElement.duration);
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

  ngOnInit(): void {
    this.elem = document.documentElement;
    document.addEventListener('fullscreenchange', ()=>{
      if(!document.fullscreenElement){
        this.isFullScreen = false;
      }
    });
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
      this.seekableTime = (this.seekableTime + seekableDuration / 100) / 2;
      this.seekableDuration = this.seekableTime;
    } else {
      this.seekableTime = 0;
      this.seekableDuration = this.seekableTime;
    }
  }

  // getDivWidth(event: MouseEvent): void {
  //   const divWidth = (event.target as HTMLDivElement);
  //   console.log('Div Width:', divWidth);
  // }

  // mouseover(event: MouseEvent):void{
  //   const divWidth = (event.target as HTMLDivElement);
  //   console.log("ss");
  // }

  onSeekMouseDown(event: MouseEvent): void {
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    const d = document.getElementById('d') as HTMLDivElement;
    const offsetX = (event.clientX - rect.left);
    const percentage = (offsetX / d.offsetWidth) * 100;
    this.seekablePercentage = percentage;
    const seekTime = (this.seekablePercentage / 100) * this.videoElement.duration;
    this.videoElement.currentTime = seekTime;
  }
}
