import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MisClasesService {
  private apiUrl = 'http://127.0.0.1:8000/api/'; 

  constructor(private http: HttpClient) { }

  // Método para obtener las clases disponibles
  getClases(): Observable<any> {
    const url = `${this.apiUrl}/clases`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        // Manejo de errores aquí
        return throwError(error);
      })
    );
  }

  inscribirseClase(clienteId: string, claseId: string): Observable<any> {
    const url = `${this.apiUrl}/clientes/${clienteId}/clases/${claseId}`;
    return this.http.post(url, null).pipe(
      catchError((error: any) => {
        // Manejo de errores aquí
        return throwError(error);
      })
    );
  }
}
