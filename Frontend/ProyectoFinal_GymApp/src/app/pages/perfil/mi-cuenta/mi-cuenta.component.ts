import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';
import { Clientes } from 'src/app/models/clientes';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  clientes: Clientes = {
    id: 0,
    nombre: '',
    apellido: '',
    dni: 'number',
    fecha_nacimiento: new Date(),
    email: '',
    password:'',
  };
  editar: boolean = false;
  opcionSeleccionada: string = 'miCuenta';

  constructor(
    private clientesService: ClientesService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const isAdmin = this.authService.getIsAdmin();
    if (!isAdmin) { // Verifica si el usuario no es un administrador
      const clienteId = this.authService.getClienteIdFromSessionStorage();
      console.log(clienteId);
      this.clientesService.obtenerCliente(clienteId).subscribe(clientes => {
        this.clientes = clientes.cliente;
        console.log('Datos del cliente:', clientes);
      });
    }
  }

  editarDatos(): void {
    this.editar = true;
  }

  guardarCambios(): void {
    const isAdmin = this.authService.getIsAdmin();
    const clienteId = isAdmin ? this.authService.obtenerIdClienteAdmin() : this.authService.getClienteIdFromSessionStorage();
    this.clientesService.actualizarCliente(clienteId, this.clientes).subscribe(() => {
      this.editar = false;
      console.log('Cambios guardados exitosamente');

      // Mostrar SweetAlert2 de éxito
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Cambios guardados exitosamente.'
      });
    });
  }
}
