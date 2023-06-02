import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiPlanService {
  private apiUrl = 'http://127.0.0.1:8000/api/clientes'; // Reemplaza con la URL real de tu API

  constructor(private http: HttpClient) { }

  getPlan(id: number): Observable<any> {
    const url = `${this.apiUrl}/mi_plan/${id}`;
    return this.http.get<any>(url);
  }
}
  