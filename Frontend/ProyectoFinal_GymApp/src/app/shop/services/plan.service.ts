import { Injectable } from '@angular/core';
import { Plan } from '../models/plan.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = 'http://127.0.0.1:8000/api/planes';
  private planes: Plan[] = []; // Almacena los planes

  constructor(private http: HttpClient) {}

  getPlanes(): Observable<Plan[]> {
    // Limpiar la matriz antes de obtener los nuevos planes
    this.planes = [];

    return this.http.get<any>(this.apiUrl).pipe(
      map((response: any) => {
        this.planes = response.planes;
        return this.planes;
      })
    );
  }

  addPlan(plan: Plan): Observable<any> {
    // Agregar el nuevo plan a la matriz existente
    this.planes.push(plan);
    return this.http.post(this.apiUrl, plan);
  }

  deletePlan(planId: number): Observable<any> {
    // Eliminar el plan de la matriz y enviar la solicitud de eliminación al servidor
    const url = `${this.apiUrl}/${planId}`;
    this.planes = this.planes.filter(plan => plan.id !== planId);
    return this.http.delete(url);
  }
}
