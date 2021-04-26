import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit{

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  //renombrar el argumento a enviar
  @Input('valor') progreso: number = 5;
  @Input() btnClass: string = 'btn-outline-success'; 

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  //@Input() progreso: number = 15;

  /*
  get getPorcentaje(){
    return `${this.progreso}%`;
  }
  */

  cambiarValor(valor: number) {

    //delimitar hasta cien
    if(this.progreso >= 100 && valor >= 0 ) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    //delimitar hasta 0
    if ( this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso =  this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }  


  onChange(NuevoValor: number) {

    if(NuevoValor >= 100) {
      NuevoValor = 100;
    } else if (NuevoValor <= 0) {
      NuevoValor = 0;
    } else {
      this.progreso = NuevoValor;
    }

    this.valorSalida.emit(NuevoValor);
  }
  
}
