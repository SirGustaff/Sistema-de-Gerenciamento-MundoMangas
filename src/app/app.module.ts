import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './AdminDashboard/home/home.component';
import { ListarCategoriaComponent } from './AdminDashboard/Categoria/listar-categoria/listar-categoria.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './guards/auth.interceptor';
import { EditarCategoriaComponent } from './AdminDashboard/Categoria/editar-categoria/editar-categoria.component';
import { AdicionarCategoriaComponent } from './AdminDashboard/Categoria/adicionar-categoria/adicionar-categoria.component';
import { ListarEditoraComponent } from './AdminDashboard/Editora/listar-editora/listar-editora.component';
import { EditarEditoraComponent } from './AdminDashboard/Editora/editar-editora/editar-editora.component';
import { AdicionarEditoraComponent } from './AdminDashboard/Editora/adicionar-editora/adicionar-editora.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListarCategoriaComponent,
    EditarCategoriaComponent,
    AdicionarCategoriaComponent,
    ListarEditoraComponent,
    EditarEditoraComponent,
    AdicionarEditoraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
