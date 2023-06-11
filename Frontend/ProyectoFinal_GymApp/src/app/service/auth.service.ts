import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  // Agrega las propiedades para almacenar las IDs de los clientes
  private clienteIdSubject = new BehaviorSubject<number>(0);
  public clienteId$ = this.clienteIdSubject.asObservable();

  private clienteAdminIdSubject = new BehaviorSubject<number>(0);
  public clienteAdminId$ = this.clienteAdminIdSubject.asObservable();

  constructor(private router: Router) {
    // Verificar el estado de autenticación al cargar el servicio
    const isAuthenticated = this.getIsAuthenticatedFromSessionStorage();
    this.updateAuthenticationStatus(isAuthenticated);
    const isAdmin = this.getIsAdminFromSessionStorage();
    this.updateAdminStatus(isAdmin);

    // Obtener las IDs de los clientes al cargar el servicio
    const clienteId = this.getClienteIdFromSessionStorage();
    this.updateClienteId(clienteId);

    const clienteAdminId = this.getClienteAdminIdFromSessionStorage();
    this.updateClienteAdminId(clienteAdminId);
  }



  public updateAdminStatus(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }
  public getIsAdmin(): boolean {
    return this.isAdminSubject.value;
  }
  private getIsAdminFromSessionStorage(): boolean {
    const isAdmin = sessionStorage.getItem('isAdmin');
    return isAdmin === 'true';
  }

  public updateAuthenticationStatus(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private getIsAuthenticatedFromSessionStorage(): boolean {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    return isAuthenticated === 'true';
  }

  // Actualiza la ID del cliente normal
  public updateClienteId(clienteId: number) {
    if (clienteId !== this.clienteIdSubject.value) {
      this.clienteIdSubject.next(clienteId);
    }
  }

  // Obtiene la ID del cliente normal
  public obtenerIdCliente(): number {
    return this.clienteIdSubject.value;
  }

  public getClienteIdFromSessionStorage(): number {
    const clienteId = sessionStorage.getItem('usuario');
    return clienteId ? parseInt(clienteId, 10) : 0;
  }

  // Actualiza la ID del cliente admin
  public updateClienteAdminId(clienteAdminId: number) {
    this.clienteAdminIdSubject.next(clienteAdminId);
  }

  // Obtiene la ID del cliente admin
  public obtenerIdClienteAdmin(): number {
    return this.clienteAdminIdSubject.value;
  }

  private getClienteAdminIdFromSessionStorage(): number {
    const clienteAdminId = sessionStorage.getItem('clienteAdminId');
    return clienteAdminId ? parseInt(clienteAdminId, 10) : 0;
  }


  logout() {
    // Guardar el token y el usuario filtrado en el sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('isAuthenticated');
    this.updateAuthenticationStatus(false);

    // Actualizar el valor de clienteIdSubject a 0
    this.updateClienteId(0);

    if (sessionStorage.getItem('isAdmin')) {
      sessionStorage.removeItem('isAdmin');
      this.updateAdminStatus(false);
      this.router.navigate(['/admin']);
      console.log("isadmin");

    } else {
      this.router.navigate(['/login']);
    }
  }
}
