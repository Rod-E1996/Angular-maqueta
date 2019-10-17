//importamos el servicio del AuthService simplemente para desplegar la imagen del usuario que inicio sesion
// import { AuthService, SocialUser } from "angularx-social-login";
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // private user: SocialUser;
  // private loggedIn: boolean;

  usuarioLogeado = false;

  constructor(public loginService: LoginService, public router: Router) { }  //de igual forma el constructor debera tener el servivio del login

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {  //de igual manera el onInit
    //   this.user = user;                               
    //   this.loggedIn = (user != null);                
    // });
    this.usuarioLogeado = this.loginService.isLoggedIn('');
    this.loginService.changeLoginStatus$.subscribe((loggedStatus: boolean) => {
      this.usuarioLogeado = loggedStatus;
    })
  }
  logout(){
    this.loginService.logout();
    this.router.navigate(['./login']);
  }
  // signOut(): void {   //Debemos incorporar cualquier funcion si deseamos ejecutarla desde otra direccion, como por ejemplo para desloguearse
  //   this.authService.signOut();
  // }

}
