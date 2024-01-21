import { Component, OnInit } from '@angular/core';
import {ThemesService} from '../Theme/themes.service';
import { ActivatedRoute } from '@angular/router';
import {Movie} from '../Models/movie';
import {MovieDetailsServiceService} from '../Services/movie-details-service.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  movieId: any;
  movie: any;
  _themes:ThemesService;
  constructor(private route:ActivatedRoute,private themes:ThemesService, private movieService:MovieDetailsServiceService){
    this._themes = themes;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any) => {
      this.movieId = +params.get('id');
      this.movie = this.movieService.getMovieById(this.movieId);
    });
  }
}
