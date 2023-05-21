import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaComponent } from './tienda.component';
import { ProductGridComponent } from '../product-grid/product-grid.component'; // <-- Import the module
import { CartComponent } from '../cart/cart.component';
import { SearchComponent } from '../search/search.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductGridModule } from '../product-grid/product-grid.module';

NgModule({
  declarations: [

    SearchComponent,
    CartComponent,
    TiendaComponent
  ],
  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
 SearchComponent,
    ProductGridModule
  ]
})
export class ShopModule { }
