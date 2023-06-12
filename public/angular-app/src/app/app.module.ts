import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import {AppRoute} from './app.route'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MoviesComponent,
    MovieComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(AppRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
