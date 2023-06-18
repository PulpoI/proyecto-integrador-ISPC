import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaClasesService {
  private apiUrl = 'http://127.0.0.1:8000/api/'; 

  constructor(private http: HttpClient) {}

  reservarClase(clienteId: number, claseId: number): Observable<any> {
    const url = `${this.apiUrl}/clientes/${clienteId}/clases/${claseId}`;
    return this.http.post(url, null);
  }
}
