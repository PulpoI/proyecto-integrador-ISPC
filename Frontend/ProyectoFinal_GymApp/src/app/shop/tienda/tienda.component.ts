import { Component } from '@angular/core';
import { PlanesTiendaComponent } from '../planesTienda/planesTienda.component';


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
