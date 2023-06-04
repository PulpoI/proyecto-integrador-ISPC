import { Component, OnInit } from '@angular/core';
import { Plan } from '../models/plan.model';
import { PlanService } from '../services/plan.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'planes-tienda',
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
        console.log(this.planes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getImagePath(index: number): string {
    if (index === 0) {
      return 'assets/platinum.jpg';
    } else if (index === 1) {
      return 'assets/pro.jpg';
    } else if (index === 2) {
      return 'assets/premium.jpg';
    } else {
      return 'assets/funcional.jpeg';
    }
  }


  addToCart(plan: Plan): void {
    this.cartService.addToCart(plan);
  }
}
