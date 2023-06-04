import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Plan } from '../models/plan.model';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isCheckoutOpen: boolean = false;

  cartItems: any[] = [];
  cartTotal: number = 0;
  planes: Plan[] = [];
  listItems: any[]=[];
  getItems(): Plan[] {
    
    return this.items;
  }
  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }
  
  openCheckout() {
    this.isCheckoutOpen = true;
  }
  
  
  addToCart(plan: Plan) {
    // this.cartService.addToCart(plan);
   
    this.items.push(plan);
    window.alert('El producto ha sido agregado al carrito!');
  }
  
  placeOrder() {
    // Aquí debes agregar la lógica para realizar el proceso de compra
    
    // Puedes enviar la información del pedido al servidor, procesar el pago, etc.
    // Por ahora, solo imprimiremos un mensaje en la consola para verificar que el método se esté ejecutando correctamente.
    console.log('Realizando pedido...');
  
    // Luego de completar la lógica de compra, puedes realizar otras operaciones necesarias, como limpiar el carrito de compras o redirigir al usuario a una página de confirmación.
  
    // Por ejemplo, puedes limpiar el carrito de compras y redirigir al usuario a una página de confirmación:
    
    this.cartService.clearCart(); // Limpia el carrito
    this.items = []; // Vacía el arreglo de ítems
  
    // Redirige al usuario a una página de confirmación (reemplaza 'ruta-de-confirmacion' por la ruta de tu página de confirmación)
    this.router.navigate(['../checkout']);
  }


  viewPlan(plan: Plan) {
    const myArray = plan;
    window.alert('abrió el detalle del producto!' + JSON.stringify(myArray));
    console.log('Product selected:', plan);}
    
  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
    this.items = this.cartService.getItems();
    for (let item of this.cartItems) {
      this.total += item.quantity * item.price;

    };
    const cartContainer = document.getElementById('cart-container');
  if (cartContainer) {
    cartContainer.classList.add('show');
  }
    
  }
  isCartOpen: boolean = false;
  total : number = 0;
  items : Plan[]  =
  [];
  constructor(private cartService: CartService,  private router: Router) {
    
  }

  removeItem(item: any): void  {
    this.cartService.removeCartItem(item);
    this.items = this.cartService.getItems();
  
  }
  updateCartItem(item: any) {
  }

 


checkout() {
  
  if (this.cartItems.length === 0) {
    console.log('El carrito está vacío');
    return;
  }

  this.router.navigate(['checkout'], { state: { items: this.cartItems } });
}

updateItem(item: Plan) {
 
}

clearCart() {
  this.cartService.clearCart();
  this.items = [];
  this.total = 0;
}

hideCart() {
  const cartContainer = document.getElementById('cart-container');

if (cartContainer) {
cartContainer.classList.remove('show');
}


}

calculateTotal(): number {
  // Calcular el subtotal sumando los precios de los productos en el carrito
  const subtotal = this.items.reduce((acc, item) => acc + item.precio, 0);

  if (subtotal > 5000) {
    return subtotal - 1500;
  } else {
    return subtotal;
  }
}


}

/*@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartTotal: number = 0;
  items: Product[] = [];
  total: number = 0;
  isCartOpen: boolean = false;


  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  addItem(product: any) {
    this.cartService.addToCart(product);
  }
  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  hideCart() {
    const cartContainer = document.getElementById('cart-container');

if (cartContainer) {
  cartContainer.classList.remove('show');
}

  }
  calculateCartTotal() {
    let total = 0;
    for (let item of this.cartItems) {
      total += (item.quantity * item.product.price);
    }
    this.cartTotal = total;
  }

  updateCartItem(item: any) {
    }

  removeCartItem(item: any) {
   
  }

  checkout() {
    // Do checkout process here
  }


  updateItem(item: Product) {
   
  }

  removeItem(item: Product) {
   
  }
  
  clearCart() {
  
  }
}
*/