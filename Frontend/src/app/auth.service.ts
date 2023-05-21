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
  constructor() {
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
}
