import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { HomeComponent } from './pages/home/home.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DashboardComponent } from './roles/admin/dashboard/dashboard.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { RegistroComponent } from './auth/registro/registro.component';

import { ProductGridComponent } from './shop/product-grid/product-grid.component';
import { TiendaComponent } from './shop/tienda/tienda.component';
import { CartComponent } from './shop/cart/cart.component';


import { CartService } from './shop/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { RouterModule } from '@angular/router';




import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginAdminComponent } from './roles/admin/login-admin/login-admin.component';
import { ClienteComponent } from './roles/admin/views/cliente/cliente.component';
import { PlanComponent } from './roles/admin/views/plan/plan.component';
import { CrearPlanComponent } from './roles/admin/views/crear-plan/crear-plan.component';
import { MiCuentaComponent } from './pages/perfil/mi-cuenta/mi-cuenta.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent, 
    NosotrosComponent,
    HomeComponent,
    ClasesComponent,
    ContactoComponent,
    DashboardComponent,
    PlanesComponent,
    RegistroComponent,
    LoginComponent,
    AppComponent,
    TiendaComponent,
    ProductGridComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
   
    LoginAdminComponent,
    ClienteComponent,
    PlanComponent,
    CrearPlanComponent,
    MiCuentaComponent,
 
 
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
  ],
  providers: [CartService, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
