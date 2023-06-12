import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Location {
  #name!: string;
  get name() {
    return this.#name;
  }
  set name(name: string) {
    this.#name = name;
  }
}
export class Job {
  #title!: string;
  #salary!: number;
  #location!: Location;
  #description!: string;
  #experince!: number;
  #skill!: string[];   
  #postDate!: Date;

  get title() {
    return this.#title;
  }

  set title(title: string) {
    this.#title = title;
  }
  get salary() {
    return this.#salary;
  }
  set salary(salary: number) {
    this.#salary = salary;
  }

  get location() {
    return this.#location;
  }

  set location(location: Location) {
      this.#location = location;
  }

  get postDate() {
    return this.#postDate;
  }
}
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  baseUrl: string = "http://localhost:3000/api/jobs";
  constructor(private _httpClient:HttpClient) { }

  getJobs(pageCount: number, offset: number, state: string): Observable<Job[]> {
    let url = this.baseUrl + "?";
    if(undefined !== pageCount) {
      url += "count=" + pageCount;
    }
    if(undefined !== state) {
      url += "&search=" + state;
    }
    if(undefined !== offset) {
      url+="&offset=" + offset;
    }
    
    return this._httpClient.get<Job[]>(url);
  }

  getTotalJobs(state: string): Observable<number> {
    let url = this.baseUrl + "/total";
    if('' !== state) {
      url += "?state=" + state;
    }
    return this._httpClient.get<number>(url);
  }
}
