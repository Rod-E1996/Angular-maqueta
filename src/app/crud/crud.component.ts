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

  usuario: Usuario = {
    idUsuario: 0,
    nombre: '',
    telefono: '',
    email: ''
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
  // obtenerUsuarios(){
  //   this.usuariosServicio.obtenerUsuarios().subscribe((usuariosDeApi: Usuario[]) =>{ //callback principal, el de obtener usuarios
  //     this.user = usuariosDeApi
  //   }, error => console.error(error)); //callback que se ejecutará si no encuentra usuarios
  // }

  obtenerUsuarios(){
    this.usuariosServicio.obtenerUsuariosWithHeaders().subscribe((response: any) =>{ //callback principal, el de obtener usuarios
      this.user = response.body
    }, error => console.error(error)); //callback que se ejecutará si no encuentra usuarios
  }

  agregarUsuario(){
    this.usuariosServicio.agregarUsuario(this.usuario).subscribe((response: Usuario)=>{
      if(201){ //estado que devuelve la api
        alert('Usuario registrado Exitosamente');
        this.obtenerUsuarios(); //refrescamos la tabla
        this.clearInputMethod1(); //limpiamos formulario
      }
    }, error=>{ //2do callback cuando algo falla
      console.log(error);
      alert('Error al añadir usuario');
    });
  }

  bajaUsuario(idUsuario){
    this.usuariosServicio.bajaUsuario(idUsuario).subscribe((response: any) => {  //respuesta proveniente de nuestra api, como promesa en este caso
        if(200){
          // console.log(response);
          alert('Registro Eliminado');
          this.obtenerUsuarios();
        }
      }
    );
  }

  editarUsuario(){
    this.usuariosServicio.editarUsuario(this.usuario).subscribe((response: Usuario)=>{
      if(200){
        // console.log(response);
        alert('Usuario Actualizado'); //alerta que proviene del php que configuramos para dar esta respuesta al agregar usuario
        this.obtenerUsuarios();
        this.clearInputMethod1();
      }
    });
  }

  seleccionarUsuario(idUsuario: number){
    this.usuariosServicio.seleccionarUsuario(idUsuario).subscribe((usuarioDeApi: Usuario)=>{
      this.usuario = usuarioDeApi;
    })
  }

  hayRegistros(){
    return true;
  }

}
