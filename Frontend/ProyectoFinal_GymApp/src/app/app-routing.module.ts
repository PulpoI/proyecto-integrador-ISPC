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
import { PlanesComponent } from './pages/planes/planes.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { TiendaComponent } from './shop/tienda/tienda.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { MiCuentaComponent } from './pages/perfil/mi-cuenta/mi-cuenta.component';






const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'inicio', component: DashboardComponent},
  {path:'nosotros', component:NosotrosComponent},
  {path:'planes', component: PlanesComponent},
  {path:'clases', component: ClasesComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'tienda', component: TiendaComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  {path:'admin', component: LoginAdminComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'cliente/:id', component: ClienteComponent},
  {path:'plan/:id', component: PlanComponent},
  {path:'crear-plan', component: CrearPlanComponent },
  {path:'mi-cuenta', component:MiCuentaComponent},
  {path: 'mi-cuenta/:id', component: MiCuentaComponent},
  {path:'**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
