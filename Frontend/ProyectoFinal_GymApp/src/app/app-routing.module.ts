import { ClientAuthGuard } from './service/auth/cliente-auth-guard';
import { CrearClaseComponent } from './roles/admin/views/crear-clase/crear-clase.component';
import { ClaseComponent } from './roles/admin/views/clase/clase.component';
import { CrearPlanComponent } from './roles/admin/views/crear-plan/crear-plan.component';
import { PlanComponent } from './roles/admin/views/plan/plan.component';
import { ClienteComponent } from './roles/admin/views/cliente/cliente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//pages
import { LoginAdminComponent } from './roles/admin/login-admin/login-admin.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './roles/admin/dashboard/dashboard.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { PlanesTiendaComponent } from './shop/planesTienda/planesTienda.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { TiendaComponent } from './shop/tienda/tienda.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { MiCuentaComponent } from './pages/perfil/mi-cuenta/mi-cuenta.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { MisSuscripcionesComponent } from './pages/perfil/mis-suscripciones/mis-suscripciones.component';
import { InscripcionClasesComponent } from './pages/perfil/inscripcion-clases/inscripcion-clases.component';
import { AdminAuthGuard } from './service/auth/admin-auth-guard';

const routes: Routes = [
  // {path:'inicio', component: DashboardComponent},
  //Pages: 
  {path:'', component: HomeComponent},
  {path:'nosotros', component:NosotrosComponent},
  {path:'planes', component:PlanesComponent},
  // {path:'planesTienda', component:PlanesTiendaComponent},
  {path:'clases', component: ClasesComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'tienda', component: TiendaComponent, canActivate: [ClientAuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  // {path:'checkout', component: CheckoutComponent, canActivate: [ClientAuthGuard]},
  {path: 'mi-cuenta', component: MiCuentaComponent, canActivate: [ClientAuthGuard]},
  {path: 'mis-suscripciones', component: MisSuscripcionesComponent, canActivate: [ClientAuthGuard]},
  {path: 'mis-clases', component: InscripcionClasesComponent, canActivate: [ClientAuthGuard]},
  {path:'',redirectTo:'/inicio', pathMatch:'full'},

  //Admin views
  {path:'admin', component: LoginAdminComponent},
  {path:'dashboard', component: DashboardComponent, canActivate: [AdminAuthGuard]},
  {path:'plan/:id', component: PlanComponent, canActivate: [AdminAuthGuard]},
  {path:'cliente/:id', component: ClienteComponent, canActivate: [AdminAuthGuard]},
  {path:'crear-plan', component: CrearPlanComponent, canActivate: [AdminAuthGuard] },
  {path:'crear-clase', component: CrearClaseComponent, canActivate: [AdminAuthGuard] },
  {path:'clase/:id', component: ClaseComponent, canActivate: [AdminAuthGuard]},
    {path:'**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
