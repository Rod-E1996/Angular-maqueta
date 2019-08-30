import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';  //primero hacemos la importacion desde la libreria de ngx-bootstrap para utilizar las herramientas de animacion que necesitaremos

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()  //luego las declararemos aqui y agregamos '.forRoot()' para que las funcionalidades esten disponibles en todos los componentes y modulos del proyecto (alcance global)
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule]  //exportamos todas las declaraciones anteriores e importamos 'AppBootstrapModule (o como se llame nuestra clase del modulo)' en app.module.ts
})
export class NavBarModule {}