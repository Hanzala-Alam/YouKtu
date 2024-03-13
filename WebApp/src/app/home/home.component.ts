import { Component, OnInit } from '@angular/core';
import {ThemesService} from '../Theme/themes.service';
import { LoaderModalComponent } from 'src/app/modal/loader-modal/loader-modal.component';
import { MatDialog } from '@angular/material/dialog';
import {MovieServiceService} from '../Services/movie-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  _themes:ThemesService;
  constructor(private themes:ThemesService, private movieService:MovieServiceService, public dialog: MatDialog){
    this._themes = themes;
    this.openModal();
  }
  ngOnInit(): void {
    this.movieService.setMovieList();
    this.movieService._movieList$.subscribe(data=> {if(data.length > 0){
      this.closeModal();        
    }});
  }

  openModal(): void {
    const dialogRef = this.dialog.open(LoaderModalComponent, {
      disableClose : true,
      // Other configuration options
    });
  }

  closeModal(): void {
    const dialogRef = this.dialog.closeAll();
  }
}
