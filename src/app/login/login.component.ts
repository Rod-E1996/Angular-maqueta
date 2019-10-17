import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../login.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private logIn: LoginService, private router: Router) { }  //inyectamos el servicio para logueo de personas

  routeRedirect ='';

  login(){
    this.logIn.login();
    this.routeRedirect= this.logIn.urlUsuarioIntentaAcceder;
    this.logIn.urlUsuarioIntentaAcceder = '';
    this.router.navigate([this.routeRedirect]);
  }


  ngOnInit() {
  }
}