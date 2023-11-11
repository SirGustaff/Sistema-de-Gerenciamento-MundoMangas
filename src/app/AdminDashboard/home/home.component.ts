import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private service: UserAuthService,
    private router: Router,
  ) {}

  logout() {
    if(this.service.isLoggedIn()) {
      this.service.clear();
      this.router.navigate(['']);
    }
  }
}
