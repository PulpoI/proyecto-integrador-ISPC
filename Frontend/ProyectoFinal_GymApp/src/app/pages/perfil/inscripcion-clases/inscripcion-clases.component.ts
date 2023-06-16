import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { ClientesService } from 'src/app/service/clientes.service';

@Component({
  selector: 'app-inscripcion-clases',
  templateUrl: './inscripcion-clases.component.html',
  styleUrls: ['./inscripcion-clases.component.css']
})
export class InscripcionClasesComponent implements OnInit {

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
  
    // Asignar el ID del cliente al usuarioId
    this.usuarioId = clienteId;
  
    // Obtener las reservas del cliente logueado
    this.getReservas();

    
  }

  getClases() {
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
  inscribirse(clase: any) {
    console.log('Inscribiendo a la clase:', clase);
  
    this.http.post<any>('http://127.0.0.1:8000/api/reservas/', { cliente_id: this.usuarioId, clase_id: clase.id }).subscribe(response => {
      console.log('Respuesta de la API:', response);
      if (response.mensaje === 'Success') {
        // Inscripción exitosa, actualizar las reservas
        this.getReservas();
      } else {
        // Manejar el caso en que ocurra un error en la inscripción
        console.log('Error al inscribirse');
      }
    });
  }
  cancelarReserva(reserva: any) {
    // Realizar la solicitud de cancelación de reserva a la API
    this.http.delete<any>('http://127.0.0.1:8000/api/reservas/' + reserva.id).subscribe(response => {
      if (response.mensaje === 'Success') {
        // Cancelación exitosa, actualizar las reservas
        this.getReservas();
      } else {
        // Manejar el caso en que ocurra un error en la cancelación de reserva
        console.log('Error al cancelar la reserva');
      }
     
    });

  }
}