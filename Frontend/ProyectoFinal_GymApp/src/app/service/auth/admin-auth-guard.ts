import { AuthService } from 'src/app/service/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.getIsAdmin()) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }
}
