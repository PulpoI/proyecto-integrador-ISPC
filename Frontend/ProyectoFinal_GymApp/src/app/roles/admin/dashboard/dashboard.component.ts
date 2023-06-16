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
    currentTab: number = 0;
  
    newPlanName: string = '';
    newClienteName: string = '';
  
    constructor(
      private apiService: ApiService,
      private router: Router
    ) {}
  
    ngOnInit() {
      this.loadData();
 
    }
  
    openTab(tabName: string) {
      this.currentTab = ['plans', 'subscriptions', 'clients'].indexOf(tabName);

    }
  
    loadData(): void {
      if (!this.planes.length || !this.clases.length || !this.clientes.length) {
        this.apiService.getData('planes').subscribe(
          (response) => {
            this.planes = response.planes;
          },
          (error) => {
            console.error('Error al obtener los datos de la API', error);
          }
        );
  
        this.apiService.getData('clases').subscribe(
          (response) => {
            this.clases = response.clases;
          },
          (error) => {
            console.error('Error al obtener los datos de la API', error);
          }
        );
  
        this.apiService.getData('clientes').subscribe(
          (response) => {
            this.clientes = response.clientes;
          },
          (error) => {
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
  
    verClase(clase: any): void {
      this.router.navigate(['/clase', clase.id], { state: { clase } });
    }
  }
  