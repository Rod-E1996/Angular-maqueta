import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service'

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  
  registrarUserData = {}  
  constructor(private _login: LoginService) { }

  ngOnInit() {
  }

  registrarUser(){
    this._login.registrarUser(this.registrarUserData).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}
