import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoginService } from '../../service/auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      fname: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logindata(): void {
    const correoElectronico = this.login.value.fname;
    const password = this.login.value.password;

    this.loginService.getData().subscribe(data => {
      const usuarioFiltrado = data.clientes.find(
        (cliente: { email: string }) => cliente.email === correoElectronico
      );

      if (usuarioFiltrado) {
        if (usuarioFiltrado.password === password) {
          console.log('Contraseña válida');

          // Mostrar SweetAlert2 de éxito
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Inicio de sesión exitoso.'
          });

          // Generar un token basado en el datetime actual
          const token = Date.now().toString();

          // Guardar el token y el usuario filtrado en el sessionStorage
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('usuario', JSON.stringify(usuarioFiltrado.id));
          sessionStorage.setItem('isAuthenticated', 'true');
          // Actualizar el estado de autenticación al iniciar sesión correctamente
          this.authService.updateAuthenticationStatus(true);
          
          // Redirigir al dashboard o a la página deseada
          const clienteId = usuarioFiltrado.id;
          this.router.navigate(['/mi-cuenta']);
        } else {
          console.log('Contraseña inválida');

          // Mostrar SweetAlert2 de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Contraseña inválida.'
          });
        }
      } else {
        console.log('No se encontró ningún usuario con el correo electrónico especificado');

        // Mostrar SweetAlert2 de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se encontró ningún usuario con el correo electrónico especificado.'
        });
      }
    });
  }
}
