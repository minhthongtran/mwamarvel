import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Movie } from './movies/movies.component';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

  #baseUrl: string = "http://localhost:3000/api/movies";

  constructor(private _httpClient: HttpClient) { }

  public getMovies(offset: number): Observable<Movie[]> {
    const url = this.#baseUrl + "?offset=" + offset + "&count=5";
    return this._httpClient.get<Movie[]>(url);
  }

  public getMovie(movieId: string): Observable<Movie> {
    const url = this.#baseUrl + "/" + movieId;
    return this._httpClient.get<Movie>(url);
  }

  public deleteMovie(movieId: string): Observable<Movie> {
    const url = this.#baseUrl + "/" + movieId;
    return this._httpClient.delete<Movie>(url);
  }

  public getPagingCount(): Observable<number> {
    const url = this.#baseUrl + "/paginate/count";
    return this._httpClient.get<number>(url);
  }
}
