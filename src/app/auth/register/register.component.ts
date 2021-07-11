import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.frmb.group({

    nombre: ['Uriel', [ Validators.required, Validators.minLength(3) ] ],
    email: ['tecabordo137@gmail.com', [ Validators.required, Validators.email ] ],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [ true , Validators.required],

  }, {
    Validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private frmb: FormBuilder, private authSvc: UsuariosService, private route: Router) { }

   //metodo para acturar la informacion
   crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    //SI NO ES VALIDO REGRESAMOS
    if( this.registerForm.invalid ){
      return;
    } 

    //SI VALIDO REALIZAR EL POSTEO
    this.authSvc.crearUsuario( this.registerForm.value )
        .subscribe(resp => {
          this.route.navigateByUrl('/');
          Swal.fire('Success', 'Usuario creado', 'success')
          console.log(resp);
        }, (err) => {
          //si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
        });


   }

   campoNoValido(campo: string): boolean{
    
    if(this.registerForm.get(campo).invalid && this.formSubmitted) {//si se posteo y no es valido
      return true
      } else { 
        return false;
      } 
   }

   aceptaTerminos(){
     return !this.registerForm.get('terminos').value && this.formSubmitted;  //si se posteo y esta en falso manda el error
   }

   contrasenaNoValid(){ //preguntamos si NO son validas

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( (pass1 !== pass2) && this.formSubmitted ) {//preguntamos si SON diferentes Y SI FUE RELLENADO
      return true; 
    } else { //
      return false;
    }

   }

   passwordsIguales(pass1igual: string, pass2igual: string){
    //
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1igual);
      const pass2Control = formGroup.get(pass2igual);

      if( pass1Control.value === pass2Control.value) {
        //si son iguales
        pass2Control.setErrors(null)
      } else { //si no son iguales
        pass2Control.setErrors({noEsIgual: true})
      }

    }
   }



}
