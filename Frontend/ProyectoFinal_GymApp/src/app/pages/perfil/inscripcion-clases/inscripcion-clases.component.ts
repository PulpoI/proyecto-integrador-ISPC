import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { ClientesService } from 'src/app/service/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripcion-clases',
  templateUrl: './inscripcion-clases.component.html',
  styleUrls: ['./inscripcion-clases.component.css']
})
export class InscripcionClasesComponent implements OnInit {
  clientes: any;
  clases: any[] = [];
  reservas: any[] = [];
  usuarioId!: number; // ID del usuario actualmente autenticado

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.getClases();

    // Obtener el ID del cliente autenticado desde el AuthService
    const clienteId = this.authService.obtenerIdCliente();
    this.usuarioId = clienteId;

    this.clientesService.obtenerCliente(this.usuarioId).subscribe(clientes => {
      this.clientes = clientes.cliente;
      console.log('Datos del cliente:', clientes.cliente);
    });

    // Obtener las reservas del cliente logueado
    this.getReservas();
  }

  getClases(): void {
    this.http.get<any>('http://127.0.0.1:8000/api/clases/').subscribe(response => {
      if (response.mensaje === 'Success') {
        this.clases = response.clases;
      }
    });
  }

  getReservas(): void {
    // Obtener el ID del cliente logueado desde el AuthService
    const clienteId = this.authService.getClienteIdFromSessionStorage();

    this.http.get<any>('http://127.0.0.1:8000/api/reservas/').subscribe(response => {
      if (response.mensaje === 'Success') {
        // Filtrar las reservas por el ID del cliente logueado
        this.reservas = response.reservas.filter((reserva: any) => reserva.cliente_id === clienteId);
        console.log(this.reservas);
      } else {
        // Manejar el caso en que ocurra un error en la inscripción
        console.log('No hay reservas');
      }
    });
  }

  inscribirse(clase: any): void {
    console.log('Inscribiendo a la clase:', clase);

    this.http.post<any>('http://127.0.0.1:8000/api/reservas/', { cliente_id: this.usuarioId, clase_id: clase.id }).subscribe(response => {
      console.log('Respuesta de la API:', response);
      if (response.mensaje === 'Success') {
        // Inscripción exitosa, actualizar las reservas
        this.http.put<any>(`http://127.0.0.1:8000/api/clientes/${this.usuarioId}`, { clases_restantes: this.clientes.clases_restantes - 1, plan_id: this.clientes.plan_id }).subscribe(response => {
          console.log('Respuesta de la API:', response);
        });

        this.http.put<any>(`http://127.0.0.1:8000/api/clases/${clase.id}`, { ...clase, cantidad_inscriptos: clase.cantidad_inscriptos + 1, estado_clase: clase.cantidad_inscriptos === clase.limite_cupos ? "No disponible" : "Disponible" }).subscribe(response => {
          console.log('Respuesta de la API:', response);
        });

        this.http.put<any>(`http://127.0.0.1:8000/api/clases/${clase.id}`, { ...clase, estado_clase: clase.cantidad_inscriptos === clase.limite_cupos ? "No disponible" : "Disponible" }).subscribe(response => {
          console.log('Respuesta de la API:', response);
        });

        this.getReservas();

        // Mostrar SweetAlert2 de éxito
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Inscripción exitosa.'
        });
      } else {
        // Mostrar SweetAlert2 de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al inscribirse.'
        });
      }
    });
  }

  cancelarReserva(reserva: any): void {
    // Realizar la solicitud de cancelación de reserva a la API
    this.http.delete<any>('http://127.0.0.1:8000/api/reservas/' + reserva.id).subscribe(response => {
      if (response.mensaje === 'Success') {
        this.http.put<any>(`http://127.0.0.1:8000/api/clientes/${this.usuarioId}`, { clases_restantes: this.clientes.clases_restantes + 1, plan_id: this.clientes.plan_id }).subscribe(response => {
          console.log('Respuesta de la API:', response);
        });

        // Cancelación exitosa, actualizar las reservas
        this.getReservas();

        // Mostrar SweetAlert2 de éxito
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Reserva cancelada exitosamente.'
        });
      } else {
        // Mostrar SweetAlert2 de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cancelar la reserva.'
        });
      }
    });
  }
}
