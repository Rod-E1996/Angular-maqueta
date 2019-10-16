import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
//nota: debemos configurar el app module para poder realizar lsa intercepciones
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor { //implementamos la interfaz interceptor

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log('http interceptor');
    //metodo intercept
    req = req.clone({ //clonamos la peticion http que se esta realizando y usamos setHeaders para configurar la cabecera deseada
      setHeaders: {'Authorization': 'token http header'}
    });
    return next.handle(req); //finalmente pasamos la peticion configurada al handler
  }
  constructor() { }
}
