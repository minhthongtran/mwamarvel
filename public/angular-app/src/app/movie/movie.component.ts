import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesServiceService } from '../movies-service.service';
import { Movie } from '../movies/movies.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: Movie;

  constructor(private _router:Router, private _activateRouter: ActivatedRoute, private _moviesService: MoviesServiceService){
    this.movie = new Movie("","",0);
  }

  ngOnInit(): void {
    const movieId = this._activateRouter.snapshot.params["movieId"];
    this._moviesService.getMovie(movieId).subscribe({
      next: (movie) => {
        this.movie = movie;
      },
      error(err) {
        console.log(err);
      },
      complete() {
      },
    })
  }

  onDelete(gameId: string) {
    this._moviesService.deleteMovie(gameId).subscribe({
      next: (value) => {
        this._router.navigate(['']);
      },
    })
  }

}
