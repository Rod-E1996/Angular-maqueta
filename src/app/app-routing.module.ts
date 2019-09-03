import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { AnimacionesComponent } from './animaciones/animaciones.component';
import { CrudComponent } from './crud/crud.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'animaciones',
    component: AnimacionesComponent
  },
  {
    path: 'crud',
    component: CrudComponent
  },
  {
    path: 'registrar',
    component: RegistrarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
