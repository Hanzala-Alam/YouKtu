import { Component, OnInit } from '@angular/core';
import {ThemesService} from '../Theme/themes.service';
import { ActivatedRoute,Router } from '@angular/router';
import {Movie} from '../Models/movie';
import {MovieServiceService} from '../Services/movie-service.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  movieId: any;
  movie:any;
  _themes:ThemesService;
  constructor(private route:ActivatedRoute,private themes:ThemesService, private movieService:MovieServiceService, private router:Router){
    this._themes = themes;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any) => {
      this.movieId = +params.get('id');
      this.movieService.getMovieById(this.movieId).subscribe(data => {this.movie = data});
    });
  }

  navigateToMediaPlayer(movie:Movie){
    // const serializeMovie = encodeURIComponent(JSON.stringify(movie));
    this.router.navigate(["MediaPlayer",movie.id]);
  }
}
