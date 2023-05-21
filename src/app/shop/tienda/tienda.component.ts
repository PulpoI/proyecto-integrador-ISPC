import { Component, OnInit } from '@angular/core';
import { ProductGridComponent } from '../product-grid/product-grid.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']

})

export class TiendaComponent {
  showCart() {
    const cartContainer = document.getElementById('cart-container');

    if (cartContainer) {
      cartContainer.classList.add('show');
    }
    
  }

}
