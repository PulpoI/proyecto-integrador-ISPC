import { AuthService } from 'src/app/service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.getIsAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirige al cliente a la página de inicio de sesión
      return false;
    }
  }
}
