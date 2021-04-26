import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //servicio cambio de tema inyectado en pages.component.ts
  public linkTheme = document.querySelector('#theme');

  constructor() {
    console.log('service ready');
    //llamar desde el localstorage el color
    //asinamos lo que trae el localstorage o por si viene basio le damos una por defecto
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme.setAttribute('href', url);
   }

   changeTheme(theme: string){
    //asinamos el nuevo tema
    const url = `./assets/css/colors/${theme}.css`;
    //console.log(url);
    //cambiar desde aqui al index lo enviamos por string
    this.linkTheme.setAttribute('href', url);
    //guardamos el tema seleccionado para que no cambie al refrescar
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();

  }

//marcar el tema seleccionado
  checkCurrentTheme(){

    const links = document.querySelectorAll('.selector');
    //console.log(links); 
      links.forEach(elem => {
      //borramos el elemento que tenga working para actualizar el que escogio el user
      elem.classList.remove('working');
      //cual es el tema del url para marcar
      const btnTheme = elem.getAttribute('data-theme');
      //construimos el url tal cual para la comparacion
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      //extraemos el color
      const currentTheme =this.linkTheme.getAttribute('href');
      //comparamos y ponemos palomita
      if(btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
  
    })
  }

}
