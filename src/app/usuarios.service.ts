//primero crearemos el servicio para lo que será nuestro crud,
//posterior a ello, se nos crearan 2 archivos: (.service.spect.ts) y (service.ts), con el nombre que hayamos puesto 
//antecediendole

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  //hacemos la importacion de esta herramienta para poder llevar a cabo 
                                                    //el servicio HTTP

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  URL = "http://localhost/api/";  //indicamos la url de nuestros archivos php 
                                  //(deben estar ubicados en nuestro directorio del servidor, o sea htdocs).

  constructor(private http: HttpClient) { }
  obtenerUsuarios(){
    return this.http.get(`${this.URL}ObtenerUsuarios.php`)  //creamos las funciones para que realize las operaciones basicas del crud
  }

  altaUsuario(usuario){
    return this.http.post(`${this.URL}AltaUsuario.php`, JSON.stringify(usuario));
  }

  bajaUsuario(idUsuario: number){
    return this.http.get(`${this.URL}BajaUsuario.php?idUsuario=${idUsuario}`);
  }

  seleccionarUsuario(idUsuario: number){
    return this.http.get(`${this.URL}SeleccionarUsuario.php?idUsuario=${idUsuario}`);
  }

  editarUsuario(usuario){
    return this.http.post(`${this.URL}EditarUsuario.php`, JSON.stringify(usuario));
  }
}
