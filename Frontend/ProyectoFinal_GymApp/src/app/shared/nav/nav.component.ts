import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    const isAuthenticatedString = sessionStorage.getItem('isAuthenticated');
    this.isAuthenticated = isAuthenticatedString === 'true';

    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    const isAdminString = sessionStorage.getItem('isAdmin');
    this.isAdmin = isAdminString === 'true';
  }
  logout() {
    this.authService.logout();
  }
}
