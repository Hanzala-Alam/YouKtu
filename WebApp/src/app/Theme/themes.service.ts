import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  //#region VeriableDecleration
  themes:boolean = false;
  isLeftNavOpen:boolean = false;
  color:string = "black";
  iconColor:string = "black";
  //#endregion

  //#region Constructor
  constructor() { 
    this.GetThemesSetting();
    this.GetDrawerSetting();
    if(this.themes){
      this.color = this.iconColor = "white";
    }else{
      this.color = this.iconColor = "black";
    }
  }
  //#endregion

  //#region Toggles
  toggleThemesMode(){
    this.themes = !this.themes;
    this.SaveThemesSetting();
    if(this.themes){
      this.color = this.iconColor = "white";
    }else{
      this.color = this.iconColor = "black";
    }
  }

  toggleLeftNav() {
    this.isLeftNavOpen = !this.isLeftNavOpen;
    this.SaveDrawerSettings();
  }
  //#endregion

  //#region Set Settings
  SaveThemesSetting(){
    if(this.themes){
      localStorage.setItem("themes","1");
    }else{
      localStorage.setItem("themes","0");
    }
  }

  SaveDrawerSettings(){
    if(this.isLeftNavOpen){
      localStorage.setItem("drawer","1");
    }else{
      localStorage.setItem("drawer","0");
    }
  }
//#endregion

//#region GetSettings
  GetThemesSetting(){
    if(localStorage.getItem("themes") == "1"){
      this.themes = true;
    }else{
      this.themes = false;
    }
  }
  GetDrawerSetting(){
    if(localStorage.getItem("drawer") == "1"){
      this.isLeftNavOpen = true;
    }else{
      this.isLeftNavOpen = false;
    }
  }
  //#endregion
}
