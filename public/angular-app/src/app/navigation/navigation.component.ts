import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    #isLoggedIn: boolean = false;
    #loggedInUser: any;

    get isLoggedIn() {
      return this.#isLoggedIn;
    }

    get loggedInUser() {
      return this.#loggedInUser;
    }

    
    constructor(private _router:Router, public _authenticationService:AuthenticationService) {
    }

    ngOnInit(): void {
      console.log(this._authenticationService.loggedInUser);
      this.#loggedInUser = this._authenticationService.loggedInUser;
      this.#isLoggedIn = this._authenticationService.isLoggedIn;
    }
    
    logout() {
      localStorage.clear();
      this._router.navigate(['']);
    }
}
