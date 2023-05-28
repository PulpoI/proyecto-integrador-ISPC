import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';
import { Clientes } from 'src/app/models/clientes';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent  implements OnInit {
  clientes: Clientes = {
    id: 0,
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: new Date(),
    email: '',
    password: ''
  };
  editar: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const clienteId = 1; // Reemplaza con la ID del cliente actualmente logueado
    this.http.get<Clientes>(`http://127.0.0.1:8000/api/clientes/${clienteId}`)
      .subscribe(clientes => {
        clientes.fechaNacimiento = new Date(clientes.fechaNacimiento);
        this.clientes = clientes;
      });
  }

  editarDatos(): void {
    this.editar = true;
  }

  guardarCambios(): void {
    this.http.put(`http://127.0.0.1:8000/api/clientes/${this.clientes.id}`, this.clientes)
      .subscribe(() => {
        this.editar = false;
        console.log('Cambios guardados exitosamente');
      });
  }
}