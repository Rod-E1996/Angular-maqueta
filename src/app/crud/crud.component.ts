import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'; //importamos estas herramientas de form para poder utilizar forms en nuestro html
//importacion de nuestro usuario.service
import { UsuariosService } from '../usuarios.service';
import { Usuario } from '../models/usuario';

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

//variables que contendran la informacion de los usuarios, que provienen de nuestra interfaz
user: Usuario[]; //todos los usuarios
notFound= false; //variable para hacer constar que no hya usuarios y no desplegar la tabla, solo el mensaje

  usuario = {
    idUsuario: null,
    nombre: null,
    telefono: null,
    email: null
  };
    /* ********para usar los formControlName es necesario configurarlos aqui, como haremos a continuacion********* */
  //Configuramos nuestro form(que proviene de nuestro html) aqui
  form = new FormGroup({
    nombre: new FormControl(this.usuario.nombre, Validators.required), //nombramos cada uno de los inputs que llevan los FormControlName
    telefono: new FormControl(this.usuario.telefono, Validators.required),
    email: new FormControl(this.usuario.email, Validators.required)
  });
  //ahora indicamos como obtendra los valores de nuestra base de datos, sustituyendo el [(ngModel)]="usuario.nombre" con el que anteriormente llamabamos dichos valores.
  get nombre(): any { return this.form.get('nombre'); }
  get telefono(): any { return this.form.get('telefono'); }
  get email(): any { return this.form.get('email'); }
  // clearInputMethod1() { this.nombre.reset(); this.telefono.reset(); this.email.reset(); }  //este es nuestro método para limpiar los inputs de nuestro formulario
  clearInputMethod1() { this.form.reset();}

  constructor(private usuariosServicio: UsuariosService) { }
  
  ngOnInit(){
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.usuariosServicio.obtenerUsuarios().subscribe((usuariosDeApi: Usuario[]) =>{ //callback principal, el de obtener usuarios
      this.user = usuariosDeApi
    }, error => console.error(error)); //callback que se ejecutará si no encuentra usuarios
  }

  altaUsuario(){
    this.usuariosServicio.altaUsuario(this.usuario).subscribe(
      respuesta => {
        if(respuesta==201){
          alert('Usuario registrado'); //alerta que proviene del php que configuramos para dar esta respuesta al agregar usuario
          this.obtenerUsuarios();
        }
      }
    );
  }

  bajaUsuario(idUsuario){
    this.usuariosServicio.bajaUsuario(idUsuario).subscribe(
      respuesta => {  //respuesta proveniente de nuestra api, como promesa en este caso
        if(respuesta==200){
          alert('Registro Eliminado');
          this.obtenerUsuarios();
        }
      }
    );
  }

  editarUsuario(usuario){
    this.usuariosServicio.editarUsuario(usuario).subscribe(
      respuesta=>{
      if(respuesta==200){
        alert('Usuario Actualizado'); //alerta que proviene del php que configuramos para dar esta respuesta al agregar usuario
        this.obtenerUsuarios();
      }
    });
  }

  seleccionarUsuario(idUsuario: number){
    this.usuariosServicio.seleccionarUsuario(idUsuario).subscribe((usuarioquevienedelaapi: Usuario)=>{
      this.usuario = usuarioquevienedelaapi;
    })
  }

  hayRegistros(){
    return true;
  }

}
