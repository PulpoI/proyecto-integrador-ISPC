import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
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
  cartItems: any[] = [];
  cartTotal: number = 0;
  products: Product[] = [];
  listItems: any[]=[];
  getItems(): Product[] {
    
    return this.items;
  }
  
  addToCart(product: Product) {
    // this.cartService.addToCart(product);
   
    this.items.push(product);
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


  viewProduct(product: Product) {
    const myArray = product;
    window.alert('abrió el detalle del producto!' + JSON.stringify(myArray));
    console.log('Product selected:', product);}
    
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
  items : Product[]  =
  [];
  constructor(private cartService: CartService,  private router: Router) {
    
  }

  calculateTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  updateCartItem(item: any) {
  }

 
    removeCartItem(item: any): void  {
  this.cartService.removeCartItem(item);
  this.items = this.cartService.getItems();
  this.calculateTotal();
}

checkout() {
  // Do checkout process here

}


updateItem(item: Product) {
 
}

removeItem(item: Product) {
 
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