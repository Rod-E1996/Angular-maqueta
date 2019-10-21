import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { LoginService } from '../login.service';
import { Login } from '../models/login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  formLogin: any;

  constructor(private logIn: LoginService, private router: Router, private formbuilder: FormBuilder) { }  //inyectamos el servicio para logueo de personas
  
  ngOnInit() {
    this.formLogin = this.formbuilder.group({
      nombre : [''],
      telefono: ['']
    });
  }

  routeRedirect ='';

  login(){
    this.logIn.login();
    this.routeRedirect= this.logIn.urlUsuarioIntentaAcceder;
    this.logIn.urlUsuarioIntentaAcceder = '';
    this.router.navigate([this.routeRedirect]);
  }

  onSubmit(){
    const juego = this.formLogin.value;
    console.log(juego);
  }

}