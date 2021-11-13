import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-images',
  templateUrl: './modal-images.component.html',
  styleUrls: ['./modal-images.component.css']
})
export class ModalImagesComponent implements OnInit {
  

  public imgSubir: File;
  public imgTemp: any = null;

  constructor(public ModalSvc: ModalImagenService, private ImgSvc: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.ModalSvc.cerrarModal();
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
      
    }
  }

  subirImagen(){

    const id = this.ModalSvc.id;
    const tipo = this.ModalSvc.tipo;

    this.ImgSvc.updateImg( this.imgSubir, tipo, id )
    .then(img => {
      
      Swal.fire('Actualizado', 'Imagen de Perfil Actualizada', 'success');
      this.ModalSvc.nuevaImagen.emit(img);//con este sacamos la url de la imgen
      this.cerrarModal();
    }).catch(error => {
      Swal.fire('Oops', 'No se actualizo imagen', 'error');
    });
  }

}
