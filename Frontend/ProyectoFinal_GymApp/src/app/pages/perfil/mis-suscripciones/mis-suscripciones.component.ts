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

  constructor(
    private clientesService: ClientesService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const isAdmin = this.authService.getIsAdmin();
    const clienteId = isAdmin ? this.authService.obtenerIdClienteAdmin() : this.authService.obtenerIdCliente();
    console.log(clienteId);
  
    this.clientesService.obtenerCliente(clienteId).subscribe(clientes => {
      this.clientes = clientes.cliente;
      console.log('Datos del cliente:', clientes);
  
      const planId = this.clientes.plan_id;
      if (planId) {
        this.http.get<any>(`http://127.0.0.1:8000/api/clientes/mi_plan/${planId}`).subscribe(
          response => {
            if (response.mensaje === 'Success') {
              this.clientes.clases_restantes = response.plan.clases_restantes;
              this.clientes.descripcion = response.plan.descripcion;
              this.clientes.cantidad_clases = response.plan.cantidad_clases;
              this.clientes.precio = response.plan.precio;
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
