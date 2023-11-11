import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './AdminDashboard/home/home.component';
import { authGuard } from './guards/auth.guard'; 
import { ListarCategoriaComponent } from './AdminDashboard/Categoria/listar-categoria/listar-categoria.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component:HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'listar-categorias',
        component: ListarCategoriaComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
