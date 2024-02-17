import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {ThemesService} from '../Theme/themes.service';
import {ActivatedRoute} from '@angular/router';
import {PlayerServicesService} from '../Services/player-services.service';
import {Movie} from '../Models/movie';
import {MovieServiceService} from '../Services/movie-service.service';
@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit, AfterViewInit {
  _themes: ThemesService;
  _playerService: PlayerServicesService
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
  canplay: boolean = false;
  movie:Movie | undefined;

  constructor(private themes:ThemesService, private playerService:PlayerServicesService, private route:ActivatedRoute, private el:ElementRef, private renderer:Renderer2,private movieService:MovieServiceService){
    this._themes = themes;
    this.videoElement = this.el.nativeElement.querySelector('#video') as HTMLVideoElement;
    this.route.paramMap.subscribe((params:any) => {
      const value = params.get('id');
      // this.movie = JSON.parse(decodeURIComponent(value));
      movieService.getMovieById(value).subscribe(data=>{this.movie = data;this.ngAfterViewInit();});
    });
    this._playerService = playerService;
  }
  ngAfterViewInit(): void {
    this.videoElement = this.el.nativeElement.querySelector('#video') as HTMLVideoElement;
    this.videoElement.addEventListener("waiting", ()=>{
      this.playerService.loading = true;
      this.canplay = false;
    });
    this.videoElement.addEventListener("playing", ()=>{
      this.playerService.loading = false;
      this.canplay = true;
    });
    if(this.movie != undefined && this.movie != null){
      this.renderer.listen(this.videoElement, 'loadeddata', () => {
        this.canplay = true;
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

      this.renderer.listen(this.videoElement,'progress',()=>{
        this.getSeekableDuration();
      });
    }
  }

  togglePlayPause(): void {
    if(!this.canplay){return;}
    const videoElement = document.getElementById('video') as HTMLVideoElement;
    
    if (videoElement.paused) {
      videoElement.play();
      this._playerService.playing = true;
    } else {
      videoElement.pause();
      this._playerService.playing = false;
    }

    this._playerService.playPauseContainerAction();
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

    const video = document.getElementById("video");
    video?.addEventListener('mouseup',()=>{this.setPlaybackNormal()});
    video?.addEventListener("click", ()=>{this.togglePlayPause();});
    video?.addEventListener("dblclick",()=>this.toggleFullScreen());
    video?.addEventListener('contextmenu', (event) => {
      event.preventDefault(); // Prevent the default context menu
    });
  }

  Last10(){
    if(!this.canplay){return;}
    if(this.videoElement.currentTime > (this.videoElement.currentTime - 10)){
      this.videoElement.currentTime = this.videoElement.currentTime-10;
    }else{
      this.videoElement.currentTime = 0;
    }
    this._playerService.skipBackwardContainerAction();
  }

  Next10(){
    if(!this.canplay){return;}
    if(this.videoElement.duration > (this.videoElement.currentTime + 10)){
      this.videoElement.currentTime = this.videoElement.currentTime + 10;
    }else{
      this.videoElement.currentTime = this.videoElement.duration;
    }
    this._playerService.skipForwardContainerAction();
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
    if(!this.canplay){return;}
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
    if(!this.canplay){return;}
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
    if(!this.canplay){return;}
    const rect = (event.target as HTMLDivElement).getBoundingClientRect();
    const d = document.getElementById('seekable') as HTMLDivElement;
    const offsetX = (event.clientX - rect.left);
    const percentage = (offsetX / d.offsetWidth) * 100;
    this.seekablePercentage = percentage;
    const seekTime = (this.seekablePercentage / 100) * this.videoElement.duration;
    this.videoElement.currentTime = seekTime;
  }

  adjustVolume(volume:number):void{
    if(!this.canplay){return;}
    this.videoElement.volume = volume;
  }

  setPlaybackRate2x():void{
    this.canplay = false;
    this.videoElement.playbackRate = 2;
    this._playerService.playback2xBody = "flex";
  }

  setPlaybackNormal():void{
    this.videoElement.playbackRate = 1;
    setTimeout(()=>{
      this.canplay = true;
      this._playerService.playback2xBodyAction();
    },10);
  }
}
