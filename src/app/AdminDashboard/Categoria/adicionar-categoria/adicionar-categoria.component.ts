import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adicionar-categoria',
  templateUrl: './adicionar-categoria.component.html',
  styleUrls: ['./adicionar-categoria.component.css']
})
export class AdicionarCategoriaComponent {

  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CategoriaService,
    private toastr: ToastrService,
  ) {}


  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60),]],
    })
  }

  onSubmit() {
    if(this.categoryForm.valid) {
      this.service.post(this.categoryForm.value).subscribe({
        next: data => {
          this.toastr.success('Categoria adicionada com sucesso', '', {
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 2000,
          });
          this.categoryForm.reset();
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

}
