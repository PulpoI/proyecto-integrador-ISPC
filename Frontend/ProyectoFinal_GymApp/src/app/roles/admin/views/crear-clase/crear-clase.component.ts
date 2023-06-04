import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.css']
})

export class CrearClaseComponent implements OnInit {
  claseForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
  
    this.claseForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fecha: ['', Validators.required],
      hora: ['', Validators.required], // Campo "hora" con valor predefinido
      limite_cupos: ['', Validators.required],
      cantidad_inscriptos: ['', Validators.required],
      estado_clase: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  crearClase() {
    const claseData = this.claseForm.value;
    claseData.hora = '2023-05-04T' + claseData.hora;
    console.log(claseData);
   
    if (this.claseForm.valid) {
      const claseData = this.claseForm.value;
      this.apiService.crearClase(claseData).subscribe(
        (response: any) => {
          // Clase creado exitosamente
          console.log('Clase creada exitosamente', response);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          console.error('Error al crear la clase', error);
        }
      );
    }
  }
}