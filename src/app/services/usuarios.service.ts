import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap, map, catchError, take, delay } from 'rxjs/operators'; //disparar un efecto secundario

import { RegisterForm } from '../interfaces/register-form';
import { LoginForm } from '../interfaces/login-form';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private httpClt: HttpClient, private route: Router, private ngZone: NgZone) {
    //servicios sigletons
    this.googleInit();//se ejecuta una unica vez
   }

   get token(): string{
    return localStorage.getItem('token') || '';
   }

   get uid():string{
    return this.usuario.uid || ''; 
   }

   get headers(){
     return {
      headers: {
        'x-token': this.token
     }
   }
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

    return this.httpClt.get(`${base_url}/login/renew`, {
      headers:{
        'x-token': this.token///get token
      }
    }).pipe(
      map( (resp: any) =>{
        
        const { email, google, nombre, role, uid, img = '' } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid);
  
        localStorage.setItem('token', resp.token);
        return true;
      }),
     
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

actualizarPerfil(data: {email:string, nombre: string, role: string}){

  //evitamos que el usuario pueda cambiarse el rol
  data = {
    ...data,
    role: this.usuario.role
  }

  return this.httpClt.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers);
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

cargarUsuario( desde: number = 0 ){
  const url = `${ base_url }/usuarios?desde=${desde}`;

  return this.httpClt.get<CargarUsuario>(url, this.headers)
    .pipe(
      ///delay(500),para darle tiempo podemos quitarlo
      map( resp => {
        console.log(resp);
        const usuarios = resp.usuarios.map( 
          user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid));
        return {
          total: resp.total,
          usuarios
        } 
      })
    )
}

eliminarUsuario(user: Usuario){
  console.log('se ha eliminado');

  const url = `${ base_url }/usuarios/${user.uid}`;
  return this.httpClt.delete(url, this.headers);

}

guardarUsuario(data:Usuario){
  return this.httpClt.put(`${ base_url }/usuarios/${ data.uid }`, data, this.headers);
}

}
