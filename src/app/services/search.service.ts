import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Produtos, ProductsPage } from '../Interfaces/produtos';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  nome: string;

  id: number;

  constructor(private http: HttpClient) {} 

  private readonly searchProducts = 'http://localhost:8080/produtos/por-nome?'

  private readonly searchProductsById = 'http://localhost:8080/produtos/'

  get(nome: string, page: number, order: string) {
    let params = new HttpParams();
    params = params.set('nome', nome)
    params = params.set('page', page);
    params = params.set('order', order);
    
    return this.http.get<ProductsPage>(this.searchProducts, { params })
    .pipe(
      map((productsPage: ProductsPage) => ({
        ...productsPage,
        items: productsPage.items.filter(produto => produto.ativo)
      })),
      tap(console.log)
    );
  }

  getById(id: number) {
    return this.http.get<Produtos>(`${this.searchProductsById}${id}`)
    .pipe(
      tap(console.log)
    );
  }

}
