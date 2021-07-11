import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';;
import { UsuariosService } from '../services/usuarios.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioSvc: UsuariosService, private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.usuarioSvc.validarToken()
      .pipe(
        tap( estaAutenticado => {
          //si no esta autenticado 
          if( !estaAutenticado ){
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
  
}
