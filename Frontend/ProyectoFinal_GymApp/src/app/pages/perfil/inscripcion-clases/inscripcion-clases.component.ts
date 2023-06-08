import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-inscripcion-clases',
  templateUrl: './inscripcion-clases.component.html',
  styleUrls: ['./inscripcion-clases.component.css']
})
export class InscripcionClasesComponent implements OnInit {
  clases: any[] = [];
  clasesInscritas: any[] = [];
  claseSeleccionada: number = 0;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerClases();
    const clienteId = this.authService.obtenerIdCliente();
    this.obtenerClasesInscritas(clienteId);
  }

  obtenerClases(): void {
    this.http.get('http://127.0.0.1:8000/api/clases/').subscribe(
      (response: any) => {
        if (response.mensaje === 'Success') {
          this.clases = response.clases;
        } else {
          console.log('No se encontraron clases');
        }
      },
      (error) => {
        console.error('Error al obtener las clases:', error);
      }
    );
  }

  obtenerClasesInscritas(clienteId: number): void {
    this.http.get('http://127.0.0.1:8000/api/reservas/?cliente_id=' + clienteId).subscribe(
      (response: any) => {
        if (response.mensaje === 'Success') {
          this.clasesInscritas = response.reservas;
        } else {
          console.log('No se encontraron reservas');
        }
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  anotarse(): void {
    const clienteId = this.authService.obtenerIdCliente();
    const reserva = { cliente_id: clienteId, clase_id: this.claseSeleccionada };
    this.http.post('http://127.0.0.1:8000/api/reservas/', reserva).subscribe(
      (response: any) => {
        if (response.mensaje === 'Success') {
          console.log('Anotado exitosamente');
          // Actualizar las clases inscritas después de realizar la reserva
          this.obtenerClasesInscritas(clienteId);
        } else {
          console.log('Error al anotarse:', response.mensaje);
        }
      },
      (error) => {
        console.error('Error al anotarse:', error);
      }
    );
  }
}
