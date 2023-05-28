import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi = 'http://127.0.0.1:8000/api/';
  private cache: { [url: string]: any } = {};

 
  constructor(private http: HttpClient) { }

  public getData(route: string): Observable<any> {
    
    const url = this.urlApi + route;

    if (this.cache[url]) {
      return of(this.cache[url]);
    } else {
      return this.http.get<any>(url).pipe(
        map((response: any) => {
          this.cache[url] = response;
          return response;
        }),
        catchError((error: any) => {
          console.error('Error al obtener los datos de la API', error);
          throw error;
        })
      );
    }
  }
  // Planes
  public crearPlan(planData: any): Observable<any> {
    const url = this.urlApi + 'planes/';
    this.cache = {}
    return this.http.post<any>(url, planData);
  }
  public eliminarPlan(planId: number): Observable<any> {
    const url = this.urlApi + 'planes/' + planId;
    this.cache = {}
    return this.http.delete<any>(url);
  }
  public actualizarPlan(id: number, planData: any): Observable<any> {
    const url = this.urlApi + `planes/${id}/`;
    return this.http.put<any>(url, planData);
  }
  //Clases
  public crearClase(claseData: any): Observable<any> {
    const url = this.urlApi + 'clases/';
    this.cache = {}
    return this.http.post<any>(url, claseData);
  }
  public eliminarClase(claseId: number): Observable<any> {
    const url = this.urlApi + 'clases/' + claseId;
    this.cache = {}
    return this.http.delete<any>(url);
  }
  
}
