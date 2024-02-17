import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Movie } from '../Models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  moveApi = "http://localhost:5190/movies";
  movieList:Movie[];
  movie?:Movie;

  constructor(private httpclient:HttpClient) { 
    this.movieList = [];
  }

  getMovieList():Observable<Movie[]>{
    return this.httpclient.get<Movie[]>(this.moveApi);
  }

  getMovieById(id:number):Observable<Movie>{
    return this.httpclient.get<Movie>(this.moveApi+'/'+id);
  }
}
