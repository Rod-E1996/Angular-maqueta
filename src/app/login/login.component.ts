import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'

//Servicio para generar tokens


//importaciones para logearse con Google y Facebook
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  loginUserData = {}

  constructor(private _login: LoginService, private authService: AuthService) { }  //inyectamos el servicio para logueo de personas

  ngOnInit() {
    this.authService.authState.subscribe((user) => {  //con AuthService, llamamos a AuthState, todo esto para comprobar si ya
      this.user = user;                               //iniciaron sesión, nos devolverá "user" si el resultado no es null
      this.loggedIn = (user != null);                 //se le asigna "true" si el resultado no es null
    });
  }
  //metodos de nuestro servicio para logueo
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  } 
 
  signOut(): void {
    this.authService.signOut();
  }


  
  //metodos para iniciar sesion previamente registrado
  

}
