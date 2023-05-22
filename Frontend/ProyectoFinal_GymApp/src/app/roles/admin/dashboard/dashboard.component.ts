import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  planes: any = []; 
  clases: any = [];
  clientes: any = [];
  isAdmin: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    const isAdminString = sessionStorage.getItem('isAdmin');
    this.isAdmin = isAdminString === 'true';
    
    // Si el usuario no es administrador, redirigir a otra página
    if (this.isAdmin) {
      this.loadData();
    } else {
      this.router.navigate(['/login']); // Cambiar la ruta según corresponda
    }
    
  }
  
  loadData(): void {
    if (!this.planes.length || !this.clases.length || !this.clientes.length) {
      this.apiService.getData('planes').subscribe(
        response => {
          this.planes = response.planes;
          console.log(response);
        },
        error => {
          console.error('Error al obtener los datos de la API', error);
        }
      );

      this.apiService.getData('clases').subscribe(
        response => {
          this.clases = response.clases;
        },
        error => {
          console.error('Error al obtener los datos de la API', error);
        }
      );

      this.apiService.getData('clientes').subscribe(
        response => {
          this.clientes = response.clientes;
          console.log(response);
        },
        error => {
          console.error('Error al obtener los datos de la API', error);
        }
      );
    }
  }

  verCliente(cliente: any): void {
    this.router.navigate(['/cliente', cliente.id], { state: { cliente } });
  }
  verPlan(plan: any): void {
    this.router.navigate(['/plan', plan.id], { state: { plan } });
  }
}
