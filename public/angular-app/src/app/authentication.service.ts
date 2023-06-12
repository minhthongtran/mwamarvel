import { Injectable } from '@angular/core';
import { User } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  #isLoggedIn: boolean = false;
  #loggedInUser: any;

  get isLoggedIn() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    this.#isLoggedIn = Boolean(isLoggedIn);
    return this.#isLoggedIn;
  }

  get loggedInUser() {
    let loggedInUser = localStorage.getItem('loggedinUser');
    this.#loggedInUser = loggedInUser;
    return this.#loggedInUser;
  }
  
  constructor() { }

  setLoggedInUser(loggedinUser: User) {
    localStorage.setItem("loggedinUser", loggedinUser.username);
    localStorage.setItem("isLoggedIn", "true");
  }
}
