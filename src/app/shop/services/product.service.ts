import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';//va en la api
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Platinum',
      colors: [],
      sizes: ["15"],
      price: 9000.00,
      quantity: 1,
      description: 'Musculación libre, Clases de actividades complementarias...',
      image: '../../assets/platinum.jpg',
      category: 'Planes',
    },
    {
      id: 2,
      name: 'Pro',
      colors: [],
      sizes: ["8"],
      price: 5000.00,
      quantity: 1,
      description: 'Musculación libre',
      image: '../../assets/premium.jpg',
      category: 'Planes',
    },
    {
      id: 7,
      name: 'Premium',
      colors: [],
      sizes: ["8"],
      price: 6000.00,
      quantity: 1,
      description: 'Musculación libre, 8 clases de actividades complementarias...',
      image: '../../assets/pro.jpg',
      category: 'Planes',
    },
  ];
  

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }
/*
constructor(private http: HttpClient) {}
addProduct(product: Product): Observable<any> {
  return this.http.post('URL_DE_TU_API', product);
}
getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>('URL_DE_TU_API');
}
deleteProduct(productId: number): Observable<any> {
  const url = `URL_DE_TU_API/${productId}`;
  return this.http.delete(url);
}
*/
  deleteProduct(productId: number): void {
    this.products = this.products.filter(product => product.id !== productId);
  }
}
