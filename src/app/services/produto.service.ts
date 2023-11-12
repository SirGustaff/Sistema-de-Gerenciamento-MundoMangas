import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Produtos, ProductsPage } from '../Interfaces/produtos';
import { take, tap } from 'rxjs/operators';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  headers = new HttpHeaders().set('authorization', `Bearer ${this.authService.getToken()}`);

  constructor(
    private http: HttpClient,
    private authService: UserAuthService,
  ) { }

  private readonly urlGet = 'http://localhost:8080/produtos/por-nome';

  private readonly urlPost = 'http://localhost:8080/produtos';

  private readonly urlPutDelete = 'http://localhost:8080/produtos/';

  get(nome: string, page: number, order: string) {

    let params = new HttpParams();
    params = params.set('nome', nome)
    params = params.set('page', page);
    params = params.set('order', order);
    
    return this.http.get<ProductsPage>(this.urlGet, { params })
    .pipe(
      tap(console.log)
    );

  }

  post(produto: Produtos) {
    return this.http.post(this.urlPost, produto, {'headers': this.headers}).pipe(take(1));
  }

  put(produto: Produtos){
    return this.http.put(`${this.urlPutDelete}${produto.id}`, produto, {'headers': this.headers}).pipe(take(1));
  }

  delete(id: number) {
    return this.http.delete(`${this.urlPutDelete}${id}`, {'headers': this.headers}).pipe(take(1));
  }
}
