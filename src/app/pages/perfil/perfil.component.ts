import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  //reactive form
  public perfilForm: FormGroup;
  public user: Usuario;
  public imgSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, private auth: UsuariosService, private imgSvc: FileUploadService) {
    this.user = auth.usuario;
   }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.user.nombre, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email] ],
    });

  }

  actualizarPerfil(){
    
    //console.log(this.perfilForm.value);
    this.auth.actualizarPerfil(this.perfilForm.value).subscribe(() => {
      const { nombre, email } =  this.perfilForm.value; 
     this.user.nombre = nombre;
     this.user.email = email;

     Swal.fire('Realizado', 'Informacion actualizada', 'success');

    }, (err) => {
      console.log(err.error.msg);
      Swal.fire('Oops', err.error.msg, 'error');

    });

  }

  CambiarImagen(event){
    this.imgSubir = event.target.files[0];
    console.log(event);

    if(!this.imgSubir){
      return this.imgTemp = null;
    }

    const reader =  new FileReader();
    reader.readAsDataURL(this.imgSubir);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
      console.log(reader.result);
    }
  }

  subirImagen(){
    this.imgSvc.updateImg( this.imgSubir, 'usuarios', this.user.uid )
    .then(img => {
      this.user = img;
      Swal.fire('Actualizado', 'Imagen de Perfil Actualizada', 'success');
    }).catch(error => {
      Swal.fire('Oops', 'No se actualizo imagen', 'error');
    });
  }

}
