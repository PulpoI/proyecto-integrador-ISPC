import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})

export class ClaseComponent {
  clase: any;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.clase = history.state.clase;
  }
  regresar(): void {
    this.router.navigate(['/dashboard']);
  }
  eliminarClase(): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta clase?')) {
      this.apiService.eliminarClase(this.clase.id).subscribe(
        (response: any) => {
          console.log('Clase eliminada exitosamente', response);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          console.error('Error al eliminar la clase', error);
        }
      );
    }
  }
  
}
