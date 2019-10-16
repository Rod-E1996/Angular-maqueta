//primero crearemos el servicio para lo que será nuestro crud,
//posterior a ello, se nos crearan 2 archivos: (.service.spect.ts) y (service.ts), con el nombre que hayamos puesto 
//antecediendole

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  //hacemos la importacion de esta herramienta para poder llevar a cabo el servicio HTTP
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario';
// import { Usuario } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  URL = environment.apiURL;

  constructor(private http: HttpClient) {}
  obtenerUsuarios():Observable<Usuario[]>{ //retorna un observable de un arreglo de usuarios
    // const headers = new HttpHeaders({
    //   'Authorization': 'bearer token'
    // });
    // let headers = new Headers();
    // headers = headers.append('Authorization', 'bearer token2');
    return this.http.get<Usuario[]>(this.URL)  //creamos las funciones para que realize las operaciones basicas del crud
  }

  obtenerUsuariosWithHeaders():Observable<any>{ //retorna un observable de un arreglo de usuarios
    return this.http.get(this.URL, {observe: 'response'})  //creamos las funciones para que realize las operaciones basicas del crud
  }

  agregarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.URL, usuario);
  }

  bajaUsuario(idUsuario: number): Observable<any>{
    const url = this.URL + idUsuario;
    return this.http.delete(url)
  }

  seleccionarUsuario(idUsuario: number):Observable<Usuario>{
    const url = this.URL + idUsuario;
    return this.http.get<Usuario>(url)
  }

  editarUsuario(usuario: Usuario): Observable<Usuario>{
    const url = this.URL + usuario.idUsuario
    return this.http.put<Usuario>(url, usuario);
  }
}