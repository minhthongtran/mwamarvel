import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './register/register.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = "http://localhost:3000/api/users";

  constructor(private _httpClient:HttpClient) { }

  register(user: User): Observable<User> {
     const url = this.baseUrl;
     let jsonUser = user.toJason();
     return this._httpClient.post<User>(url, jsonUser);
  }

  login(user: any): Observable<User> {
    const url = this.baseUrl + "/login";
    return this._httpClient.post<User>(url, user);
 }
}
