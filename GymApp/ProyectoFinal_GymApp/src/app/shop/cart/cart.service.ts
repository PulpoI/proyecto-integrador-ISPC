import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  items: Product[] = [];
  
  constructor() { }
  getItems() {
    return this.items;
  }
  
  addToCart(product: Product) {
    this.items.push(product);
    
  }
  
  removeCartItem(product: Product): void{
    // Find the index of the product in the cart items array
  const index = this.items.findIndex(item => item.id === product.id);

  // If the product is found in the cart
  if (index !== -1) {
    // Remove the product from the cartItems array
    this.items.splice(index, 1);
  }
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  getTotal() {
    return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}

