import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario : Usuario;

  constructor(private authSvc: UsuariosService) { 
    this.usuario = authSvc.usuario;
  }

  logout(){
    this.authSvc.logout();
  }



}
