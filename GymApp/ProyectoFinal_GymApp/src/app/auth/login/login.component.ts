import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup|any;
  constructor() { }

  ngOnInit(): void {
  this.login = new FormGroup({
  'fname' : new FormControl(),
  'password' : new FormControl()
  })/*
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
    const contraseña = this.login.value.password;

    this.loginService.getData().subscribe(data => {
      const usuarioFiltrado = data.clientes.find(
        (cliente: { email: string }) => cliente.email === correoElectronico
      );

      if (usuarioFiltrado) {
        if (usuarioFiltrado.contraseña === contraseña) {
          console.log('Contraseña válida');

          // Generar un token basado en el datetime actual
          const token = Date.now().toString();

          // Guardar el token y el usuario filtrado en el sessionStorage
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('usuario', JSON.stringify(usuarioFiltrado));
          sessionStorage.setItem('isAuthenticated', 'true');
          // Actualizar el estado de autenticación al iniciar sesión correctamente
          this.authService.updateAuthenticationStatus(true);
          
          // Redirigir al dashboard o a la página deseada
          this.router.navigate(['/mi-cuenta']);
        } else {
          console.log('Contraseña inválida');
        }
      } else {
        console.log('No se encontró ningún usuario con el correo electrónico especificado');
      }
    });
  }
}

  logindata(login:FormGroup) {
    console.log(this.login.value);
    
  }
*/
  }
}