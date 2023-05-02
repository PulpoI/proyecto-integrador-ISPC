import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ClasesComponent } from './clases/clases.component';
import { HomeComponent } from './home/home.component';
import { PlanesComponent } from './planes/planes.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NosotrosComponent,
    ContactoComponent,
    ClasesComponent,
    HomeComponent,
    PlanesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
