import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Inicio ',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Home',
          url: '/'
        },
        {
          titulo: 'Progress Bar',
          url: 'progress'
        },
        {
          titulo: 'Charts',
          url: 'grafica1'
        },
        {
          titulo: 'Promesas',
          url: 'promesas'
        },
        {
          titulo: 'Rxjs',
          url: 'rxjs'
        }
        
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          titulo: 'Usuarios',
          url: 'usuarios'
        },
        {
          titulo: 'Hospitales',
          url: 'hospitales'
        },
        {
          titulo: 'Medicos',
          url: 'medicos'
        }        
      ]
    }
  ];

  constructor() { }
}
