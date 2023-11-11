import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
        this.toastr.success('O login foi realizado com sucesso', '', {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 2000,
        });
        this.router.navigate(['/home'], { replaceUrl: true });
      },
      error: (error: any) => {
        this.toastr.error('Suas credenciais podem estar erradas', 'Impossível fazer o login', {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 2000,
        });
      }
    });
  }
}
