import { ApiService } from 'src/app/service/api.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  plan: any;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.plan = history.state.plan;
  }
  regresar(): void {
    this.router.navigate(['/dashboard']);
  }
  eliminarPlan(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este plan?')) {
      this.apiService.eliminarPlan(this.plan.id).subscribe(
        (response: any) => {
          console.log('Plan eliminado exitosamente', response);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          console.error('Error al eliminar el plan', error);
        }
      );
    }
  }
  
}
