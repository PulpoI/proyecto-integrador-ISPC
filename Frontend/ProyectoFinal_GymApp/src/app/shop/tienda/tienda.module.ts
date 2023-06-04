import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanesTiendaComponent } from '../planesTienda/planesTienda.component';
import { PlanesTiendaModule } from '../planesTienda/planesTienda.module';
@NgModule({
  imports: [
    CommonModule,
    PlanesTiendaModule,
  ],
  declarations:[]
})
export class TiendaModule { }