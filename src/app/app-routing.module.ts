import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';



const routes: Routes = [
  /*RUTAS HIJAS EN PAGE COMPONENT RUTAS PROTEGIDAS*/ 
  
  //path : './dashboard pagesRouting';
  //path: '/auth authRouting';
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NopagefoundComponent
  }

  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[RouterModule]
})
export class  AppRoutingModule { }
