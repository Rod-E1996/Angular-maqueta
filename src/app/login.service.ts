import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // URL = "http://localhost/ang-api/token/token";
  // loginUser(user){
  //   return this.http.post(`${this.URL}addSubs.php`, JSON.stringify(user))
  // }

  constructor() { }
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
}
