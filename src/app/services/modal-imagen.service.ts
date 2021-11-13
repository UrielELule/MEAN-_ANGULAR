import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
 public tipo:'usuarios'|'medicos'|'hospitales';
 public id:string;
 public img?:string;

 public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios'|'medicos'|'hospitales', id: string, img: string = 'no-img' ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;
    //http://localhost:3005/api/uploads/hospitales/44789e9f-980a-4f26-8278-307f748f82ba.png
    if(img.includes('https')){
      this.img = img;
    } else {
      this.img = `${base_url}/uploads/${tipo}/${img}`;
    }
  }

  cerrarModal(){
    this._ocultarModal = true;
  }

  constructor() { }
}
