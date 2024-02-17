import { Injectable } from '@angular/core';
import { Movie } from '../Models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsServiceService {

  constructor() { }
  private movies: Movie[] = [
    // Add more movie entries as needed
  ];

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovieById(id: number): Movie | undefined {
    return this.movies.find((movie) => movie.id === id);
  }
}
