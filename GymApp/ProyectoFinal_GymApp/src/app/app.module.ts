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
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';

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
    LoginAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
