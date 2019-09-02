//importamos el servicio del AuthService simplemente para desplegar la imagen del usuario que inicio sesion
import { AuthService, SocialUser } from "angularx-social-login";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService) { }  //de igual forma el constructor debera tener el servivio del login

  ngOnInit() {
    this.authService.authState.subscribe((user) => {  //de igual manera el onInit
      this.user = user;                               
      this.loggedIn = (user != null);                
    });
  }
  signOut(): void {   //Debemos incorporar cualquier funcion si deseamos ejecutarla desde otra direccion, como por ejemplo para desloguearse
    this.authService.signOut();
  }

}
