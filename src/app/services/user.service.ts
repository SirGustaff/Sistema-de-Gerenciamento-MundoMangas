import { Injectable } from '@angular/core';
import { HttpClient
 } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiLogin = 'http://localhost:8080/auth/login';

  constructor(
    private http: HttpClient,
  ) {}

  login(loginData: any) {
    return this.http.post(this.apiLogin, loginData);
  }

}
