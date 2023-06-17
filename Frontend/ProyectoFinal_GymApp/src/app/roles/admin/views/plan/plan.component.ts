import { ApiService } from 'src/app/service/api.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  title = 'sweetAlert';
  plan: any;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.plan = history.state.plan;
  }
  regresar(): void {
    this.router.navigate(['/dashboard']);
  }

  showModal() {
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás deshacer este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínala!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarPlan();
      }
    });
  }

  eliminarPlan(): void {
    
      this.apiService.eliminarPlan(this.plan.id).subscribe(
        (response: any) => {
          console.log('Plan eliminado exitosamente', response);
          Swal.fire(
            'Eliminado!',
            'Tu plan fue eliminado!.',
            'success'
          ).then(() => {
            this.router.navigate(['/dashboard']);
          });
        },
        (error: any) => {
          console.error('Error al eliminarel plane', error);
        }
      );
    
  }
  
}
