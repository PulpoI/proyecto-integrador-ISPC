import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { ClientesService } from 'src/app/service/clientes.service';

@Component({
  selector: 'app-mis-suscripciones',
  templateUrl: './mis-suscripciones.component.html',
  styleUrls: ['./mis-suscripciones.component.css']
})
export class MisSuscripcionesComponent implements OnInit {
  clientes: any;
  descripcionPlan: string = '';

  constructor(
    private clientesService: ClientesService,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const isAdmin = this.authService.getIsAdmin();
    if (!isAdmin) { // Verifica si el usuario no es un administrador
      const clienteId = this.authService.getClienteIdFromSessionStorage();
      console.log(clienteId);

      this.clientesService.obtenerCliente(clienteId).subscribe(clientes => {
        this.clientes = clientes.cliente;
        console.log('Datos del cliente:', clientes);

        const planId = this.clientes.plan.planId;
        if (planId) {
          this.http.get<any>(`http://127.0.0.1:8000/api/clientes/mi_plan/${planId}`).subscribe(
            response => {
              if (response.mensaje === 'Success') {
                const clasesRestantes = response.plan.clases_restantes;
                this.clientes.plan.clases_restantes = clasesRestantes;
                this.clientes.plan.cantidad_clases = response.plan.cantidad_clases;
                this.clientes.plan.precio = response.plan.precio;
                this.clientes.plan.descripcion = response.plan.descripcion.replace(/\n/g, '<br><br>');

                console.log('Descripción del Plan:', response.plan.descripcion);
                console.log('Clases Restantes:', clasesRestantes);
              } else {
                console.error('Error al obtener el plan:', response.mensaje);
              }
            },
            error => {
              console.error('Error al obtener el plan:', error);
            }
          );
        }
      });
    }
  }
}
