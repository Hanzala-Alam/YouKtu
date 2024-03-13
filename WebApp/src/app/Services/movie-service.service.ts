import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Movie } from '../Models/movie';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  moveApi = "http://localhost:5190/movies";
  private dataSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  private movieSubject: BehaviorSubject<Movie | null> = new BehaviorSubject<Movie | null>(null);
  public _movieList$: Observable<Movie[]> = this.dataSubject.asObservable();
  public _movie$: Observable<Movie | null> = this.movieSubject.asObservable();
  movieList:Movie[];
  movie?:Movie;

  constructor(private httpclient:HttpClient) { 
    this.movieList = [];
  }

  getMovieById(id:number):Observable<Movie>{
    return this.httpclient.get<Movie>(this.moveApi+'/'+id);
  }

  setMovieList(){
    this.httpclient.get<Movie[]>(this.moveApi).subscribe(data =>{this.dataSubject.next(data);});
  }

  setMovieData(id:number){
    this.httpclient.get<Movie>(this.moveApi+'/'+id).subscribe(data => {this.movieSubject.next(data);});
  }
}
