import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ClasesComponent } from './clases/clases.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NosotrosComponent,
    ContactoComponent,
    ClasesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
