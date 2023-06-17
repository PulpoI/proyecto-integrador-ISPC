import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent {
  title = 'sweetAlert';
  clase: any;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.clase = history.state.clase;
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
        this.eliminarClase();
      }
    });
  }

  eliminarClase(): void {
    this.apiService.eliminarClase(this.clase.id).subscribe(
      (response: any) => {
        console.log('Clase eliminada exitosamente', response);
        Swal.fire(
          'eliminada!',
          'Tu clase ha sido eliminada.',
          'success'
        ).then(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      (error: any) => {
        console.error('Error al eliminar la clase', error);
      }
    );
  }
}
