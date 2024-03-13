import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import {ThemesService} from '../../Theme/themes.service';
import {MovieServiceService} from '../../Services/movie-service.service';
import {Movie} from '../../Models/movie';
import {Router} from '@angular/router';
import { LoaderModalComponent } from 'src/app/modal/loader-modal/loader-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit,AfterViewInit {
  _themes:ThemesService;
  movieList:Movie[] = [];
  constructor(private themes:ThemesService, private movieService:MovieServiceService, private router:Router,public dialog: MatDialog, private renderer:Renderer2){
    this._themes = themes;
    this.movieService._movieList$.subscribe(data=> {this.movieList = data});
  }
  ngAfterViewInit(): void {
    
  }
  
  ngOnInit(): void {
  }

  navigateToPreview(id:number){
    this.router.navigate(['/Preview', id]);
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
