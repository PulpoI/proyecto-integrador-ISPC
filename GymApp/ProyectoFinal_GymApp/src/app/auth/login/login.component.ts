import { LoginService } from './../../service/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup | any;
  data: any = [];
  dataFiltrada: any = [];

  constructor(private apiService: LoginService, private authService: AuthService) {}

  ngOnInit(): void {
    this.traerData();
    this.login = new FormGroup({
      'fname': new FormControl(),
      'password': new FormControl()
    });
  }

  traerData() {
    this.apiService.getData().subscribe(data => {
      this.data = data;
    });
  }

  logindata(login: FormGroup) {
    const correoElectronico = this.login.value.fname;
    const contraseña = this.login.value.password;

    this.dataFiltrada = this.data.clientes.filter((cliente: { email: any; }) => cliente.email === correoElectronico);

    if (this.dataFiltrada.length > 0) {
      const usuarioFiltrado = this.dataFiltrada[0];

      if (usuarioFiltrado.contraseña === contraseña) {
        console.log('Contraseña válida');

        // Generar un token basado en el datetime actual
        const token = Date.now().toString();

        // Guardar el token y el usuario filtrado en el localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuarioFiltrado));
         // Actualizar el estado de autenticación al iniciar sesión correctamente
         this.authService.setIsAuthenticated(true);
        
      } else {
        console.log('Contraseña inválida');
      }
    } else {
      console.log('No se encontró ningún usuario con el correo electrónico especificado');
    }
  }
}







