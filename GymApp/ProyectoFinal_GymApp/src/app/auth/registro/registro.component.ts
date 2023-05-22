
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/service/clientes.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private clienteService: ClienteService) {
    this.registroForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      fecha_nacimiento: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contraseña: new FormControl('', Validators.required)
    });
  }

  registrarCliente(): void {
    if (this.registroForm.valid) {
      const cliente = this.registroForm.value;
      this.clienteService.registrarCliente(cliente).subscribe(
        response => {
          console.log('Cliente registrado exitosamente:', response);
         
        },
        error => {
          console.error('Error al registrar el cliente:', error);
       
        }
      );
    }
  }
}