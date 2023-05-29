import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanesTiendaComponent } from './planesTienda.component';
import { PlanService } from '../services/plan.service';

@NgModule({
  declarations: [
    PlanesTiendaComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers:[PlanService],
  exports: [
    PlanesTiendaComponent,
  ],
})
export class PlanesTiendaModule { }
