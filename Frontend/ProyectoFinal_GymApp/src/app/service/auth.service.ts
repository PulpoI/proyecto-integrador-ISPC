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
  constructor(private router: Router) {
    // Verificar el estado de autenticación al cargar el servicio
    const isAuthenticated = this.getIsAuthenticatedFromSessionStorage();
    this.updateAuthenticationStatus(isAuthenticated);
    const isAdmin = this.getIsAdminFromSessionStorage();
    this.updateAdminStatus(isAdmin);
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
  logout() {
    // Guardar el token y el usuario filtrado en el sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('isAuthenticated');
    this.updateAuthenticationStatus(false);
    
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
