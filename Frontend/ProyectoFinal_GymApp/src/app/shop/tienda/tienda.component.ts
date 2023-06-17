import { Component } from '@angular/core';
import { PlanesTiendaComponent } from '../planesTienda/planesTienda.component';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  isCartOpen = false;

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  showCart(): void {
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      cartContainer.classList.add('show');
    }
  }
} 