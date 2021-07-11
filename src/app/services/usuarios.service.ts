import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, map, catchError, take } from 'rxjs/operators'; //disparar un efecto secundario

import { RegisterForm } from '../interfaces/register-form';
import { LoginForm } from '../interfaces/login-form';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any;

  constructor(private httpClt: HttpClient, private route: Router, private ngZone: NgZone) {
    //servicios sigletons
    this.googleInit();//se ejecuta una unica vez
   }


  googleInit(){

    return new Promise((resolve: any) => {

     

      gapi.load('auth2',() => {
        this.auth2 = gapi.auth2.init({
          client_id: '709728706544-p2md53pfaobu657o9r2tofq5o9tivmkf.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });

    })

  }

  logout(){
    localStorage.removeItem('token');//borramos el token del storage
  
    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {//para el tema de librerias externas ngzone
        this.route.navigateByUrl('/login');
      })
    });
  }

  //verificamos el token
  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.httpClt.get(`${base_url}/login/renew`, {
      headers:{
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) =>{
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError( error => of(false) )//para no romper el ciclo
    );

  }



  crearUsuario(formData: RegisterForm){
    return this.httpClt.post(`${ base_url }/usuarios`, formData).pipe(
      tap( (resp: any) => {
        console.log(resp);
        localStorage.setItem('token', resp.token)
      })
    );
  }

  loginUsuario(formData: LoginForm){
    return this.httpClt.post(`${base_url}/login`, formData)
                      .pipe(
                        tap( (resp: any) => {
                          console.log(resp);
                          localStorage.setItem('token', resp.token)
                        })
                      );
  }

  loginGoogle(token){
    return this.httpClt.post(`${base_url}/login/google`, {token})
                      .pipe(
                        tap( (resp: any) => {
                          console.log(resp);
                          localStorage.setItem('token', resp.token)
                        })
                      );
  }

}
