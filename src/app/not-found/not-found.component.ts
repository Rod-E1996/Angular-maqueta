import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  encapsulation: ViewEncapsulation.None //propiedad para poder implementar y configurar propiedades html sin problemas
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
