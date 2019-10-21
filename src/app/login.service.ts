import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './models/login';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = "http://localhost/ang-api/token/token/login";
  // loginUser(user){
  //   return this.http.post(`${this.URL}addSubs.php`, JSON.stringify(user))
  // }

  constructor(private http: HttpClient) {}
  readonly ISLOGGEDKEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJub21icmUiOiJEb25hbGQgVHJ1bXAifQ.bhbAJCnGJ_F8WWKs4qLD1JvwWxZVu6iNhKYQ3lFpHLE';
  public urlUsuarioIntentaAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  login(){
    localStorage.setItem(this.ISLOGGEDKEY, 'true');
    this.changeLoginStatusSubject.next(true);
  }

  logout(){
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
  }

  isLoggedIn(url:string){
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    if(!isLogged){
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }


  prueba(usuario: Login): Observable<Login>{
    return this.http.post<Login>(this.URL, usuario);
  }
}
