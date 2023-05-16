import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
  

  // ngOnInit(): void {
  //   // Verificar si hay un token en el localStorage al iniciar el componente
  //   const token = localStorage.getItem('token');
  //   this.userLoginOn = token !== null && token !== undefined;
  // }
}