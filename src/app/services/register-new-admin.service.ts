import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { Usuario } from '../Interfaces/usuario';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterNewAdminService {

  constructor(private http: HttpClient, private authService: UserAuthService) {} 

  readonly registerUrl = 'http://localhost:8080/auth/admin-register'

  headers = new HttpHeaders().set('authorization', `Bearer ${this.authService.getToken()}`)

  register(user: Usuario) {
    return this.http.post(this.registerUrl, user, {'headers': this.headers}).pipe(take(1));
  }

}
