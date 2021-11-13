import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario; 

  menuItems: any[];

  constructor(private sideSvc: SidebarService, private authSvc: UsuariosService) {

    this.menuItems = sideSvc.menu;
    //console.log(this.menuItems);
    this.usuario = authSvc.usuario;

   }

  ngOnInit(): void {
  }

}
