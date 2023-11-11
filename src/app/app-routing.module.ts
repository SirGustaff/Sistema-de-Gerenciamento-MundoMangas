import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './AdminDashboard/home/home.component';
import { authGuard } from './guards/auth.guard'; 
import { ListarCategoriaComponent } from './AdminDashboard/Categoria/listar-categoria/listar-categoria.component';
import { AdicionarCategoriaComponent } from './AdminDashboard/Categoria/adicionar-categoria/adicionar-categoria.component';
import { ListarEditoraComponent } from './AdminDashboard/Editora/listar-editora/listar-editora.component';
import { AdicionarEditoraComponent } from './AdminDashboard/Editora/adicionar-editora/adicionar-editora.component';

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
      {
        path: 'adicionar-categoria',
        component: AdicionarCategoriaComponent
      },
      {
        path: 'listar-editoras',
        component: ListarEditoraComponent
      },
      {
        path: 'adicionar-editora',
        component: AdicionarEditoraComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
