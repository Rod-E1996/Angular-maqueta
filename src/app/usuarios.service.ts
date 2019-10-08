//primero crearemos el servicio para lo que será nuestro crud,
//posterior a ello, se nos crearan 2 archivos: (.service.spect.ts) y (service.ts), con el nombre que hayamos puesto 
//antecediendole

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  //hacemos la importacion de esta herramienta para poder llevar a cabo el servicio HTTP
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario';
// import { Usuario } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  URL = environment.apiURL;

  constructor(private http: HttpClient) { }
  obtenerUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.URL)  //creamos las funciones para que realize las operaciones basicas del crud
  }

  altaUsuario(usuario){
    return this.http.post(`${this.URL}`,usuario);
  }

  bajaUsuario(idUsuario: number){
    return this.http.delete(`${this.URL}/${idUsuario}`);
  }

  seleccionarUsuario(idUsuario: number):Observable<Usuario>{
    const url = this.URL + idUsuario;
    return this.http.get<Usuario>(url)
  }

  editarUsuario(usuario){
    return this.http.put(`${this.URL}/${usuario.idUsuario}`, usuario);
  }
}
