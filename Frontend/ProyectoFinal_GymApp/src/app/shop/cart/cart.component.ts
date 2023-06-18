import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Plan } from '../models/plan.model';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() isCartOpen = false;
  isCheckoutOpen: boolean = false;
  botonDesactivado: boolean = false;
  cartItems: any[] = [];
  cartTotal: number = 0;
  planes: Plan[] = [];
  listItems: any[] = [];
  seccionActual: number = 1;
  seccionVisible: number = 1;
  mostrarSeccion1: boolean = true; // Variable para controlar la visibilidad de la sección 1

  mostrarSeccion(seccion: number) {
    if (seccion === 3) {
      this.seccionVisible = 3;
      this.seccionActual = 3;
      this.isCheckoutOpen = false;
      this.mostrarSeccion1 = false; // Oculta la sección 1
    } else if (seccion === 2) {
      this.seccionVisible = seccion;
      this.isCheckoutOpen = true;
      this.mostrarSeccion1 = true; // Muestra la sección 1
    } else {
      this.seccionVisible = seccion;
      this.isCheckoutOpen = false;
      this.mostrarSeccion1 = true; // Muestra la sección 1
    }
  }
  getItems(): Plan[] {
    return this.items;
  }
  @Output() itemAdded: EventEmitter<any> = new EventEmitter<any>();

  addItem(item: any): void {
    this.cartItems.push(item);
    this.itemAdded.emit(item);
  }

  openCheckout() {
    this.isCheckoutOpen = true;
    this.botonDesactivado = true; 
  this.seccionVisible = 2;
  }
  
  addToCart(plan: Plan) {
    this.cartService.addToCart(plan);
    window.alert('El producto ha sido agregado al carrito!');
  }
  
  placeOrder() {
    console.log('Realizando pedido...');
    this.cartService.clearCart();
    this.items = [];
    this.router.navigate(['../checkout']);
  }

  viewPlan(plan: Plan) {
    const myArray = plan;
    window.alert('abrió el detalle del producto!' + JSON.stringify(myArray));
    console.log('Product selected:', plan);
  }
    
  ngOnInit(): void {
    this.isCartOpen = false; // Asegura que el carrito esté cerrado al iniciar o refrescar la página
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
    this.items = this.cartService.getItems();
    for (let item of this.cartItems) {
      this.total += item.quantity * item.precio;
    }
    
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      cartContainer.classList.add('hidden'); // Oculta el contenedor del carrito por defecto
    }
  }
  
  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
    
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      if (this.isCartOpen) {
        cartContainer.classList.remove('hidden'); // Muestra el contenedor del carrito al abrirlo
      } else {
        cartContainer.classList.add('hidden'); // Oculta el contenedor del carrito al cerrarlo
      }
    }
  }
  
  
  
  total: number = 0;
  items: Plan[] = [];
  
  constructor(private cartService: CartService, private router: Router) {}
  
  removeItem(item: any): void  {
    this.cartService.removeCartItem(item);
    this.items = this.cartService.getItems();
  }

  checkout() {
    if (this.cartItems.length === 0) {
      console.log('El carrito está vacío');
      return;
    }

    this.router.navigate(['checkout'], { state: { items: this.cartItems } });
  }

  updateItem(item: Plan) {
    // Lógica para actualizar un ítem en el carrito
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
    const subtotal = this.items.reduce((acc, item) => acc + item.precio, 0);

    if (subtotal > 5000) {
      return subtotal - 1500;
    } else {
      return subtotal;
    }
  }
}
