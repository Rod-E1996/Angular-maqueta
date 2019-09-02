import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//importacion de modelos para la base de datos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from './usuarios.service'  //aqui va nuestro modulo de servicio (para la consulta de datos)

//herramientas de ngx bootstrap
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';

//Angular confirmation popover
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';

//importacion de modulos y componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './navbar/navbar.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AnimacionesComponent } from './animaciones/animaciones.component';
import { HomeComponent } from './home/home.component';
import { CrudComponent } from './crud/crud.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

//Social login para Google y Facebook
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("682671342714-asia6s1gdgkbgg7ree1dri91ig32ties.apps.googleusercontent.com")  //id que nos proporciona google al solicitar permiso para utilizar sus servicios
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,  //declaraciones de otros modulos
    AnimacionesComponent,
    HomeComponent,
    CrudComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocialLoginModule, //para logearse con Google y Facebook
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl:'never'}), //el .withConfig, es simplemente para que no tire la advertencia a la hora de revisar la consola
    HttpClientModule, //modulo para servicio xmlhttp request

    //angular confirmation popover
    ConfirmationPopoverModule.forRoot({   //aqui se configuran globalmente los popover
      confirmButtonType: 'btn btn-outline-danger',
      cancelButtonType: 'btn btn-outline-secondary',
      cancelText: 'No <i class="fas fa-times"></i>',  //por defecto viene 'Cancel' en el botón cancelar
      confirmText: 'Si <i class="fas fa-trash"></i>'
    }),

    //viene de navbar.module
    NavBarModule,
    AppRoutingModule,
    //ngx bootstrap 
    TabsModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [
    //proviene de nuestro usuarios.service
    UsuariosService,
    //de nuestro social login
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
