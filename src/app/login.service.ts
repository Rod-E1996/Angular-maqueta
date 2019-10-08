import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = "http://localhost/usersApi/";

  constructor(private http: HttpClient) { }
  registrarUser(user){
    return this.http.post(`${this.URL}addSubs.php`, JSON.stringify(user))
  }

  // loginUser(user){
  //   return this.http.post(`${this.URL}addSubs.php`, JSON.stringify(user))
  // }
}
