import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { PastelComponent } from './pastel/pastel.component';
import { ModalImagesComponent } from './modal-images/modal-images.component';



@NgModule({
  declarations: [IncrementadorComponent, PastelComponent, ModalImagesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
   
  ],
  exports: [
    IncrementadorComponent,
    PastelComponent,
    ModalImagesComponent
  ]
})
export class ComponentsModule { }
