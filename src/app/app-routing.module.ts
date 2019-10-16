import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { AnimacionesComponent } from './animaciones/animaciones.component';
import { CrudComponent } from './crud/crud.component';
// import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: "**",
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
