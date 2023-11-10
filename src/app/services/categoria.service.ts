import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorias, CategoryPage } from '../Interfaces/categorias';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly urlGet = 'http://localhost:8080/categorias/por-nome';

  private readonly urlPost = 'http://localhost:8080/categorias';

  private readonly urlPutDelete = 'http://localhost:8080/categorias/';

  constructor(
    private http: HttpClient,
  ) {}

  get(nome: string, page: number, order: string) {

    let params = new HttpParams();
    params = params.set('nome', nome)
    params = params.set('page', page);
    params = params.set('order', order);
    
  
    return this.http.get<CategoryPage>(this.urlGet, { params })
    .pipe(
      tap(console.log)
    );
  }

  post(categoria: Categorias) {
    return this.http.post(this.urlPost, categoria).pipe(take(1));
  }

  put(categoria: Categorias){
    return this.http.put(`${this.urlPutDelete}${categoria.id}`, categoria).pipe(take(1));
  }

  delete(id: number) {
    return this.http.delete(`${this.urlPutDelete}${id}`).pipe(take(1));
  }
}
