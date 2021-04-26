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
        }
      ]
    },
    {
      titulo: 'Consulta',
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
        }
      ]
    }
  ];

  constructor() { }
}
