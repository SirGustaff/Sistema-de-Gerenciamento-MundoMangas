import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Editoras, PublisherPage } from '../Interfaces/editoras';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditoraService {

  private readonly urlGet = 'http://localhost:8080/editoras/por-nome';

  private readonly urlPost = 'http://localhost:8080/editoras';

  private readonly urlPutDelete = 'http://localhost:8080/editoras/';

  constructor(
    private http: HttpClient,
  ) {}

  get(nome: string, page: number, order: string) {

    let params = new HttpParams();
    params = params.set('nome', nome)
    params = params.set('page', page);
    params = params.set('order', order);
    
  
    return this.http.get<PublisherPage>(this.urlGet, { params })
    .pipe(
      tap(console.log)
    );
  }

  post(editora: Editoras) {
    return this.http.post(this.urlPost, editora).pipe(take(1));
  }

  put(editora: Editoras){
    return this.http.put(`${this.urlPutDelete}${editora.id}`, editora).pipe(take(1));
  }

  delete(id: number) {
    return this.http.delete(`${this.urlPutDelete}${id}`).pipe(take(1));
  }
}
