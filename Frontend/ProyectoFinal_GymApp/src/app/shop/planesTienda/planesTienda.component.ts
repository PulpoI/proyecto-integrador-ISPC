import { Component, OnInit } from '@angular/core';
import { Plan } from '../models/plan.model';
import { PlanService } from '../services/plan.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'planes-tienda', // Corregido el selector
  templateUrl: './planesTienda.component.html',
  styleUrls: ['./planesTienda.component.css'],
})
export class PlanesTiendaComponent implements OnInit {
  planes: Plan[] = [];

  constructor(
    private planService: PlanService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.planService.getPlanes().subscribe(
      (response: Plan[]) => {
        this.planes = response;
        console.log(this.planes); // Agregar esta línea
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addToCart(plan: Plan): void {
    this.cartService.addToCart(plan);
  }
}
