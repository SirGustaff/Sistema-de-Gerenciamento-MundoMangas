import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly apiLogin = 'http://localhost:8080/auth/login';

  readonly userInfo = 'http://localhost:8080/user';

  headers = new HttpHeaders().set('authorization', `Bearer ${this.authService.getToken()}`)

  constructor(
    private http: HttpClient,
    private authService: UserAuthService,
  ) {}

  login(loginData: any) {
    return this.http.post(this.apiLogin, loginData);
  }

  getUserInfo() {
    return this.http.get(this.userInfo, {'headers': this.headers});
  }

}
