import { Component, OnInit } from '@angular/core';
import { RegisterNewAdminService } from 'src/app/services/register-new-admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-admin',
  templateUrl: './registrar-admin.component.html',
  styleUrls: ['./registrar-admin.component.css']
})
export class RegistrarAdminComponent implements OnInit {

  userForm: FormGroup

  constructor(
    private registerAdminService: RegisterNewAdminService, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: [, [Validators.required]],
      senha: [, [Validators.required]],
      nome: [, [Validators.required]],
      sobrenome: [, [Validators.required]],
      cpf: [, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dataNascimento: [, [Validators.required]]
    })
  }

  onSubmit() {
    this.registerAdminService.register(this.userForm.value).subscribe({
      next: data => {
        this.toastr.success('Usuário adicionado com sucesso', '', {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 2000,
        });
        this.userForm.reset();
      },
      error: error => {
        this.toastr.error(error.error.detail, '', {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 2000,
        });
      }
    });
  }


}
