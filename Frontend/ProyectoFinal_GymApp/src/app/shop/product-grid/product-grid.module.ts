import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from './product-grid.component';

@NgModule({
  declarations: [ProductGridComponent],
  exports: [ProductGridComponent], // <-- Export the component
  imports: [
    CommonModule
  ]
})
export class ProductGridModule { }

