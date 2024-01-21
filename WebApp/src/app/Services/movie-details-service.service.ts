import { Injectable } from '@angular/core';
import { Movie } from '../Models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsServiceService {

  constructor() { }
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      releaseDate: '2010-07-16',
      genre: 'Science Fiction',
      description:
        'A thief who enters the dreams of others to steal their secrets.',
    },
    // Add more movie entries as needed
  ];

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovieById(id: number): Movie | undefined {
    return this.movies.find((movie) => movie.id === id);
  }
}
