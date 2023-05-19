import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//pages
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { ClasesComponent } from './pages/clases/clases.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';



const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'inicio', component: DashboardComponent},
  {path:'nosotros', component:NosotrosComponent},
  {path:'planes', component: PlanesComponent},
  {path:'clases', component: ClasesComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'admin', component: LoginAdminComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
