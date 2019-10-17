import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
//nota: debemos configurar el app module para poder realizar lsa intercepciones
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor { //implementamos la interfaz interceptor
  
  constructor(private login: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log('http interceptor');
    //metodo intercept
    req = req.clone({ //clonamos la peticion http que se esta realizando y usamos setHeaders para configurar la cabecera deseada
      setHeaders: {'Authorization': this.login.ISLOGGEDKEY}
    });
    return next.handle(req); //finalmente pasamos la peticion configurada al handler
  }
}
