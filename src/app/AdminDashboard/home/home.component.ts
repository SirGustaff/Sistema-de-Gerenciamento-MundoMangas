import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showDefaultContent = true;

  userInfo$: Observable<any>;

  constructor(
    private authService: UserAuthService,
    private userService: UserService, 
    private router: Router,
  ) {}

  ngOnInit() {
    this.userInfo$ = this.userService.getUserInfo();
  }

  logout() {
    if(this.authService.isLoggedIn()) {
      this.authService.clear();
      this.router.navigate(['']);
    }
  }

  onActivate(event: any) {
    this.showDefaultContent = false;
  }

}
