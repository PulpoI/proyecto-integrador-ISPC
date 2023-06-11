import { ClientAuthGuard } from './service/auth/cliente-auth-guard';
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
import { RegistroComponent } from './auth/registro/registro.component';
import { TiendaComponent } from './shop/tienda/tienda.component';
import { CartComponent } from './shop/cart/cart.component';
import { CartService } from './shop/cart/cart.service';
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
import { CrearClaseComponent } from './roles/admin/views/crear-clase/crear-clase.component';
import { ClaseComponent } from './roles/admin/views/clase/clase.component';
import{MatTabsModule} from '@angular/material/tabs';
import { PlanesTiendaComponent } from './shop/planesTienda/planesTienda.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { PlanesTiendaModule } from './shop/planesTienda/planesTienda.module';
import { TiendaModule } from './shop/tienda/tienda.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule, CurrencyPipe } from '@angular/common';
import { MisSuscripcionesComponent } from './pages/perfil/mis-suscripciones/mis-suscripciones.component';
import { InscripcionClasesComponent } from './pages/perfil/inscripcion-clases/inscripcion-clases.component';
import { AdminAuthGuard } from './service/auth/admin-auth-guard';
@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent, 
    NosotrosComponent,
    HomeComponent,
    ClasesComponent,
    ContactoComponent,
    DashboardComponent,
    RegistroComponent,
    LoginComponent,
    TiendaComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    LoginAdminComponent,
    ClienteComponent,
    PlanComponent,
    CrearPlanComponent,
    MiCuentaComponent,
    CrearClaseComponent,
    ClaseComponent,
    MisSuscripcionesComponent,
    InscripcionClasesComponent,
    
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    TiendaModule,
    PlanesTiendaModule,
    CommonModule,
    MatTabsModule,
    BrowserAnimationsModule,
  ],
  providers: [CartService, CurrencyPipe, AdminAuthGuard, ClientAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
