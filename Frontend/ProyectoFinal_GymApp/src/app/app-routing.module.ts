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

const routes: Routes = [
  // {path:'inicio', component: DashboardComponent},
  //Pages: 
  {path:'', component: HomeComponent},
  {path:'nosotros', component:NosotrosComponent},
  {path:'planes', component:PlanesComponent},
  {path:'planesTienda', component:PlanesTiendaComponent},
  {path:'clases', component: ClasesComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'tienda', component: TiendaComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'checkout', component: CheckoutComponent},
  {path: 'mi-cuenta', component: MiCuentaComponent},
  {path: 'mis-suscripciones', component: MisSuscripcionesComponent},
  {path: 'mis-clases', component: InscripcionClasesComponent},
  {path:'',redirectTo:'/inicio', pathMatch:'full'},

  //Admin views
  {path:'admin', component: LoginAdminComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'plan/:id', component: PlanComponent},
  {path:'cliente/:id', component: ClienteComponent},
  {path:'crear-plan', component: CrearPlanComponent },
  {path:'crear-clase', component: CrearClaseComponent },
  {path:'clase/:id', component: ClaseComponent},
    {path:'**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
