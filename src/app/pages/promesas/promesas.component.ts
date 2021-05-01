import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //this.getUsuario();

    this.getUsuario().then( usuario => {
      console.log(usuario);
    });

    /*
    const promesa = new Promise( (resolve, reject) => {
      if(false){
        resolve('Hola Mundo');
      } else {
        reject('Uppss algo salio mal');
      }
      
    });

    promesa.then( (mensaje) => {
      console.log(mensaje,'hey termine');
    }).catch( error => console.log('Error en mi promesa', error));

    console.log('Fin del init');
    */
  }

  getUsuario() {
    /*Primera forma no optima*/
    /*fetch('https://reqres.in/api/users?page=2')
    .then(resp => {
      resp.json().then(body => console.log(body))
    });*/

    /**Segunda Forma Optimizada**/

    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users?page=2')
      .then( resp => resp.json() )
      .then( body => resolve(body.data) );
    });
    
    return promesa;
  }

}
