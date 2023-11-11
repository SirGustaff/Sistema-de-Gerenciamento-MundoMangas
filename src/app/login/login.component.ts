import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: [, [Validators.required, Validators.email]],
      senha: [, [Validators.required]],
    })
  }

  ngOnInit() {
    if(this.userAuthService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  onLogin() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data.token);
        this.userAuthService.setToken(data.token);
        this.router.navigate(['/home'], { replaceUrl: true });
      },
      error: (error: any) => {
        console.log(error.details);
      }
    });
  }
}
