import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { PastelComponent } from './pastel/pastel.component';



@NgModule({
  declarations: [IncrementadorComponent, PastelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,
    PastelComponent
  ]
})
export class ComponentsModule { }
