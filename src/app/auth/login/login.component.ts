import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2'

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  public auth2: any;

  //formulario reactivo
  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router, private fb: FormBuilder, private authSvc: UsuariosService, private ngZone: NgZone) { }

  ngOnInit(){
    this.renderButton();
  }


  login(){
    
    //console.log(this.loginForm.value);    //tenermos la informacion del formulario
    this.authSvc.loginUsuario(this.loginForm.value)
        .subscribe(resp => {

          console.log(resp);
          if(this.loginForm.get('remember').value){
            localStorage.setItem('email', this.loginForm.get('email').value); //recordar el email
          } else {
            localStorage.removeItem('email'); //si no quiere guardar el email
          }

          ///MOVER A DASBOARD
        this.router.navigateByUrl('/');

        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
    
    //this.router.navigateByUrl('/');
  }


renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'light '
  });
  this.startApp();
}

async startApp() {

    await this.authSvc.googleInit();
    this.auth2 = this.authSvc.auth2;
    this.attachSignin(document.getElementById('my-signin2')); //creamos el boton
  
};

attachSignin(element) {
  this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.authSvc.loginGoogle( id_token ).subscribe(resp => {
          ///MOVER A DASBOARD
          this.ngZone.run( () => {
            this.router.navigateByUrl('/');
          })
        });
          

      },(error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
}

}
 