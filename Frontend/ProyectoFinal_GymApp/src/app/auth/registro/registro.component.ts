import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/service/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  registroExitoso: boolean = false;
  registroError: boolean = false;

  constructor(
    private registroService: RegistroService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      fecha_nacimiento: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  registrarCliente(): void {
    if (this.registroForm.valid) {
      const cliente = {
        nombre: this.registroForm.get('nombre')?.value,
        apellido: this.registroForm.get('apellido')?.value,
        dni: this.registroForm.get('dni')?.value,
        fecha_nacimiento: this.registroForm.get('fecha_nacimiento')?.value,
        email: this.registroForm.get('email')?.value,
        password: this.registroForm.get('password')?.value
      };

      this.registroService.registrarCliente(cliente).subscribe(
        response => {
          console.log('Cliente registrado exitosamente:', response);
          this.registroExitoso = true;
          this.registroError = false;

          // Mostrar SweetAlert2 de éxito
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario registrado exitosamente.'
          });

          // Generar un token basado en el datetime actual
          const token = Date.now().toString();

          // Guardar el token y el usuario filtrado en el sessionStorage
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('usuario', JSON.stringify(response.cliente.id));
          sessionStorage.setItem('isAuthenticated', 'true');
          // Actualizar el estado de autenticación al iniciar sesión correctamente
          this.authService.updateAuthenticationStatus(true);

          // Redirigir al dashboard o a la página deseada
          this.router.navigate(['/mi-cuenta']);
        },
        error => {
          console.error('Error al registrar el cliente:', error);
          this.registroExitoso = false;
          this.registroError = true;

          // Mostrar SweetAlert2 de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar el cliente.'
          });
        }
      );
    }
  }
}
