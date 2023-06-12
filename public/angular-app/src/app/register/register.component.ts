import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

export class User {
   #name: string;
   #username: string;
   #password: string;

   constructor(name: string, username: string, password: string) {
    this.#name = name;
    this.#password = password;
    this.#username = username;
   }

   get name() {
    return this.#name;
   }
   set name(name: string) {
    this.#name = name;
   }
   get username() {
    return this.#username;
   }
   set username(username: string) {
    this.#username = username;
   }
   get password() {
    return this.#password;
   }
   set password(password: string) {
    this.#password = password;
   }

   toJason(): {} {
     return {
       name: this.#name,
       username: this.#username,
       password: this.#password
     }
   }

}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    user!: User;
    constructor(private _router:Router, private _usersService:UserService){
      this.user = new User("","","");
    }

    register() {
      this._usersService.register(this.user).subscribe({
        next: (user) => {
           alert(user.name + " is registered!");
           this._router.navigate(['/login']);
        },
        error(err) {
          alert("error when register user!");
        },
      })
    }
}
