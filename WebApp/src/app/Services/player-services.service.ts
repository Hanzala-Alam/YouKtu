import { animate, animation, transition } from '@angular/animations';
import { Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PlayerServicesService{
  volume:number = 1;
  volumeIcon:string = "";
  playing:boolean = false;
  playPauseContainer:string = "none";
  playback2xBody:string = "none";
  skipBackwardContainer: string = "none";
  skipForwardContainer: string = "none";
  loading:boolean = true;
  constructor(){
    this.getVolumeSetting();
  }

  setVolumeSetting():void{
    localStorage.setItem('volume',this.volume.toString());
    this.getVolumeSetting();
  }

  setVolumeMute():void{
    if(this.volume == 0){
      this.volume = parseFloat(localStorage.getItem("previousVolume")??"1");
      localStorage.setItem('volume',this.volume.toString());
      this.getVolumeSetting();
    }else{
      localStorage.setItem("previousVolume",this.volume.toString());
      localStorage.setItem('volume',"0");
      this.getVolumeSetting();
    }
  }

  getVolumeSetting():void{
    this.volume = parseFloat(localStorage.getItem('volume')??"1");
    if(this.volume == 0){
      this.volumeIcon = "fas fa-volume-mute";
    }
    if(this.volume > 0){
      this.volumeIcon = "fas fa-volume-off";
    }
    if(this.volume > 0.2){
      this.volumeIcon = "fas fa-volume-down";
    }if(this.volume > 0.5){
      this.volumeIcon = "fas fa-volume-up";
    }
  }

  playPauseContainerAction():void{
    this.playPauseContainer = "flex";
    setTimeout(()=>{
      this.playPauseContainer = "none";
    },800);
  }

  playback2xBodyAction():void{
    this.playback2xBody = "none";
  }

  skipBackwardContainerAction():void{
    this.skipBackwardContainer = "flex";
    setTimeout(()=>{
      this.skipBackwardContainer = "none";
    },800);
  }

  skipForwardContainerAction():void{
    this.skipForwardContainer = "flex";
    setTimeout(()=>{
      this.skipForwardContainer = "none";
    },800);
  }
}