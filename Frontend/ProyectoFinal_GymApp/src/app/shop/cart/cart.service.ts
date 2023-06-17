import { Injectable, HostListener } from '@angular/core';
import { Plan } from '../models/plan.model';
import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { PlanService } from '../services/plan.service';
import { FormGroup } from '@angular/forms';
import { CurrencyPipe } from '../pipes/currency.pipe';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  items: Plan[] = [];
  private formData: FormGroup | null = null;
  isCartOpen = false;

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: any): void {
    if (!target.closest('.cart')) {
      this.isCartOpen = false;
    }
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }
 
 
  itemAdded: Subject<any> = new Subject<any>();
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
  
  calculateTotal(): number {
    // Calcular el subtotal sumando los precios de los productos en el carrito
    return this.items.reduce((subtotal, item) => subtotal + item.precio, 0);
  }
  
  setFormData(formData: FormGroup): void {
    this.formData = formData;
  }

  getFormData(): FormGroup | null {
    return this.formData;
  }

  restoreFormData(formData: FormGroup): void {
    this.formData = formData;
  }
}

