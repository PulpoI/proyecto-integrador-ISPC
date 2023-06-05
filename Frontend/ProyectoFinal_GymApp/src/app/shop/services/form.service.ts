import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formData: any;

  constructor(private http: HttpClient) {
    this.formData = {};
  }

  setFormData(data: any): void {
    this.formData = data;
  }

  getFormData(): any {
    return this.formData;
  }

  saveFormData(): void {
    // Hacer una solicitud HTTP para guardar los datos del formulario en la API
    this.http.post('http://127.0.0.1:8000/api/cliente', this.formData)
      .subscribe(
        (response) => {
          console.log('Datos del formulario guardados correctamente', response);
        },
        (error) => {
          console.error('Error al guardar los datos del formulario', error);
        }
      );
  }
}
