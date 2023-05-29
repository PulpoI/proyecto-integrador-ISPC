import { Injectable } from '@angular/core';
import { Plan } from '../models/plan.model';
import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';

import { PlanService } from '../services/plan.service';

import { CurrencyPipe } from '../pipes/currency.pipe';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  items: Plan[] = [];
  
  constructor() { }
  getItems() {
    return this.items;
  }
  
  addToCart(plan: Plan) {
    this.items.push(plan);
    
  }
  
  removeCartItem(plan: Plan): void{
    // Find the index of the product in the cart items array
  const index = this.items.findIndex(item => item.id === plan.id);

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
    return this.items.reduce((acc, item) => acc + (item.precio * item.cantidad_clases), 0);
  }
}

