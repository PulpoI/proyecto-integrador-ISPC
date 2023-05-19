import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  planes: any = []; 
  clases: any = [];
  clientes: any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getDataFromApi();
    
  }

  getDataFromApi() {
    this.apiService.getData('planes').subscribe(
      response => {
        this.planes = response.planes;
        console.log(response)
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
        console.log(response)
        },
      error => {
        console.error('Error al obtener los datos de la API', error);
      }
    );
    }
}
