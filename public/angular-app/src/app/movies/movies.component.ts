import { Component, OnInit } from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';

export class Movie {
  #name!: string;
  #release!: number;
  #_id!: string;
  constructor(id: string, name: string, release: number) {
    this.#name = name;
    this.#release = release;
    this.#_id = id;
  }

  get _id() {
    return this.#_id;
  }
  set _id(id: string) {
    this.#_id = id;
  }

  get name() {
    return this.#name;
  }
  set name(name: string) {
    this.#name = name;
  }
  get release() {
    return this.#release;
  }
  set release(release: number) {
    this.#release = release;
  }
}
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = new Array<Movie>();

  pageCount: number = 0;
  limit: number = 5;

  constructor(private _moviesService: MoviesServiceService) {}

  ngOnInit(): void {
    this._getMoviesWithPaging(this.pageCount, this.limit);
  }

  display(count: number) {
    this.pageCount += count;
    if(this.pageCount < 0) this.pageCount = 0;
    let offset = this.pageCount * this.limit;
    this._getMoviesWithPaging(offset, count);
  }

  _getMoviesWithPaging(offset: number, count: number) {
    this._moviesService.getMovies(offset).subscribe({
      next: (movies) => {
        if(movies.length > 0) {
          this.movies = movies;
        } else {
          this.pageCount -= count;
        }
      },
      error(err) {
        console.log(err);
      }
    })
  }
}
