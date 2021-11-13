import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from '../../../services/usuarios.service';
import { BusquedaService } from '../../../services/busqueda.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public imgSubs: Subscription; //para evitar que se cargue la pagina
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = []; //para busqueda
  public paginaDesde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioSvc: UsuariosService, 
               private fieldSvc: BusquedaService, 
               private modalImgsvc: ModalImagenService) { }

  //evitamos que se vuelta a cargar
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

   this.cargarUsurios();
  this.imgSubs = this.modalImgsvc.nuevaImagen.pipe(   //imgSubs para evitar la doble carga del portal
     delay(100)
   ).subscribe(img => this.cargarUsurios());

  }

  cambiarPagina( valor: number ) {
    this.paginaDesde  +=valor; //le vamos sumando 

    if(this.paginaDesde < 0){  //controlamos que no se rompa si preciona atras siendo el primero
      this.paginaDesde = 0;
    } else if (this.paginaDesde >= this.totalUsuarios){
      this.paginaDesde -= valor;
    }

    this.cargarUsurios();

  }

  cargarUsurios(){
    this.cargando = true;
    this.usuarioSvc.cargarUsuario(this.paginaDesde).subscribe( ({ total, usuarios }) => {
      this.totalUsuarios = total;
      //PARA EVITAR CARGAR SI NO HAY YA USUARIOS
      if(usuarios.length !== 0){
        this.usuarios = usuarios;
      }
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
  })
  }

  buscar(termino: string){

    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }

    
    this.fieldSvc.buscar( 'usuarios', termino)
    .subscribe( resp => {
      this.usuarios = resp
    });
  }

  eliminarUsuario(user: Usuario){

    if(user.uid === this.usuarioSvc.uid){
      return Swal.fire('Error', 'No se puede eliminar en este momento', 'error');
    }
    console.log('Esto no se tiene que ver');
    return;

    Swal.fire({
      title: 'Eliminar usuario',
      text: `Esta seguro que desea eliminar al usuario ? ${user.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioSvc.eliminarUsuario(user)
        .subscribe( resp => {
          this.cargarUsurios();
          Swal.fire(
            'Usuario Eliminado',
            `${user.nombre} se ha eliminado correctamente`,
            'success'
          );
        });
        
      }
    })
  }

  cambiarRole(user: Usuario){
    //console.log(user);
    this.usuarioSvc.guardarUsuario(user).subscribe( resp => {
      console.log(resp);
    })
  }


  abrirModal(user: Usuario){
    console.log(user);
    this.modalImgsvc.abrirModal('usuarios',user.uid, user.img);
  }

}
