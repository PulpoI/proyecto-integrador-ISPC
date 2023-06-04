import { LoginAdminService } from 'src/app/service/auth/login-admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  loginAdmin: FormGroup | any;
  data: any = [];
  dataFiltrada: any = [];
  isAdmin: boolean = false;

  constructor(private loginAdminService: LoginAdminService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.traerData();
    this.loginAdmin = new FormGroup({
      'fname': new FormControl(),
      'password': new FormControl()
    });
  }

  traerData() {
    this.loginAdminService.getData().subscribe(data => {
      this.data = data;
    });
  }

  logindata() {
    const correoElectronico = this.loginAdmin.value.fname;
    const password = this.loginAdmin.value.password;

    this.dataFiltrada = this.data.admins.filter((admin: { email: any; }) => admin.email === correoElectronico);

    if (this.dataFiltrada.length > 0) {
      const usuarioFiltrado = this.dataFiltrada[0];

      if (usuarioFiltrado.password === password) {
        console.log('Contraseña válida');

        // Generar un token basado en el datetime actual
        const token = Date.now().toString();

        // Guardar el token y el usuario filtrado en el sessionStorage
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('usuario', JSON.stringify(usuarioFiltrado));
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('isAdmin', 'true');
        this.authService.updateAuthenticationStatus(true);
        this.authService.updateAdminStatus(true);
        this.router.navigate(['/dashboard']);
      } else {
        console.log('Contraseña inválida');
      }
    } else {
      console.log('No se encontró ningún usuario con el correo electrónico especificado');
    }
  }


}





