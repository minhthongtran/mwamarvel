import { LoginComponent } from "./login/login.component";
import { MovieComponent } from "./movie/movie.component";
import { MoviesComponent } from "./movies/movies.component";
import { RegisterComponent } from "./register/register.component";

export const AppRoute = [
  {
    path: "",
    component: MoviesComponent
  },
  {
    path: "movies/:movieId",
    component: MovieComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }
]