//importacion de nuestro usuario.service
import { UsuariosService } from '../usuarios.service';

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms'; //importamos estas herramientas de form para poder utilizar forms en nuestro html

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  //popover alerts, aqui se configura el titulo de cada alerta
  public popoverTitle: string = 'Eliminar registro';
  public popoverMessage: string = '¿realmente desea eliminar?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;



//variables que contendran la informacion de los usuarios
  usuarios = null;

  usuario = {
    idUsuario: null,
    nombre: null,
    telefono: null,
    email: null
  }

  /* ********para usar los formControlName es necesario configurarlos aqui, como haremos a continuacion********* */
  //Configuramos nuestro form(que proviene de nuestro html) aqui
  form = new FormGroup({
    nombre: new FormControl(this.usuario.nombre), //nombramos cada uno de los inputs que llevan los FormControlName
    telefono: new FormControl(this.usuario.telefono),
    email: new FormControl(this.usuario.email)
  });  
  //ahora indicamos como obtendra los valores de nuestra base de datos, sustituyendo el [(ngModel)]="usuario.nombre" con el que anteriormente llamabamos dichos valores.
  get nombre(): any { return this.form.get('nombre'); }
  get telefono(): any { return this.form.get('telefono'); }
  get email(): any { return this.form.get('email'); }
  clearInputMethod1() { this.nombre.reset(); this.telefono.reset(); this.email.reset(); }  //este es nuestro método para limpiar los inputs de nuestro formulario

  constructor(private usuariosServicio: UsuariosService) { }

  ngOnInit(){
    this.obtenerUsuarios();
  }
  
  obtenerUsuarios(){
    this.usuariosServicio.obtenerUsuarios().subscribe(
      result => this.usuarios = result
    );
  }

  altaUsuario(){
    this.usuariosServicio.altaUsuario(this.usuario).subscribe(
      datos => {
        if(datos['resultado'] == 'OK'){
          alert(datos['mensaje']); //alerta que proviene del php que configuramos para dar esta respuesta al agregar usuario
          this.obtenerUsuarios();
        }
      }
    );
  }

  bajaUsuario(idUsuario){
    this.usuariosServicio.bajaUsuario(idUsuario).subscribe(
      datos => {
        if(datos['resultado']== 'OK'){
          alert(datos['mensaje']);
          this.obtenerUsuarios();
        }
      }
    );
  }

  editarUsuario(){
    this.usuariosServicio.editarUsuario(this.usuario).subscribe(
      datos => {
        if(datos['resultado']=='OK'){
          alert(datos['mensaje']);
          this.obtenerUsuarios();
        }
      }
    );
  }

  seleccionarUsuario(idUsuario){
    this.usuariosServicio.seleccionarUsuario(idUsuario).subscribe(
      result => this.usuario = result[0]
    );
  }

  hayRegistros(){
    return true;
  }

}
