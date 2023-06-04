import { ApiService } from 'src/app/service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent implements OnInit {
  planForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.planForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      cantidad_clases: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  crearPlan() {
    if (this.planForm.valid) {
      const planData = this.planForm.value;
      this.apiService.crearPlan(planData).subscribe(
        (response: any) => {
          // Plan creado exitosamente
          console.log('Plan creado exitosamente', response);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          console.error('Error al crear el plan', error);
        }
      );
    }
  }
}
