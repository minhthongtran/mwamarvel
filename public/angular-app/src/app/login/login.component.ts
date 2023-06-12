import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    username!: string;
    password!: string;
    successMessage: string = "Login Successful!";
    errorMessage: string = "Login Failed!";
    loginSucceed: boolean = false;
    loginFailed: boolean = false;
    
    constructor(private _router:Router, private _userService:UserService, private _authenticationService: AuthenticationService){}

    login() {
      let loginUser = {
        username: this.username,
        password: this.password,
      }
       this._userService.login(loginUser).subscribe({
        next: (loginUser) => {
          this._authenticationService.setLoggedInUser(loginUser);
          this.loginSucceed = true;
          this.loginFailed = false;
        },
        error: (err) => {
          this.loginSucceed = false;
          this.loginFailed = true;
          localStorage.clear();
        }
       })
    }
}
