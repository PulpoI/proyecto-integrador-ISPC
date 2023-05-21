import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  products: Product[] = [];
  items: Product[] = [];
  
  constructor(private productService: ProductService,private cartService: CartService) {
   
    this.products = productService.getProducts();
    console.log('Products:', this.products);
  }
  getItems() {
    return this.items;
  }
  
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Adding to cart:', product);
    window.alert('El producto ha sido agregado al carrito!');
    this.items.push(product);
    
  }


  clearCart() {
    this.items = [];
    return this.items;
  }
  viewProduct(product: Product) {
    const myArray = product;
    window.alert('abrió el detalle del producto!' + JSON.stringify(myArray));
    console.log('Product selected:', product);}
    
  ngOnInit(): void {
  }
}




