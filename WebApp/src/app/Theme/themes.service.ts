import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  themes:boolean = false;
  isLeftNavOpen = false;
  color:string = "black";
  iconColor:string = "black";
  constructor() { }

  toggleThemesMode(){
    this.themes = !this.themes;
    if(this.themes){
      this.color = this.iconColor = "white";
    }else{
      this.color = this.iconColor = "black";
    }
  }
}
