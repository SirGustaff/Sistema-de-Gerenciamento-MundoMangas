import { Component, Input } from '@angular/core';
import { Categorias } from '../../../Interfaces/categorias';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent {

  @Input() categoria: Categorias;

  editForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditarCategoriaComponent>,
    private formBuilder: FormBuilder,
    private service: CategoriaService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [this.categoria.id],
      nome: [this.categoria.nome,[Validators.required, Validators.minLength(3), Validators.maxLength(60),]]
    })
  }

  updateCategoria() {
    if (this.editForm.valid && this.editForm.valueChanges) {
      this.service.put(this.editForm.value).subscribe({
        next: data => {
          this.toastr.success('Categoria atualizada com sucesso', '', {
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 2000,
          });
          this.dialogRef.close('atualizou');
        },
        error: error => {
          this.toastr.error(error.error.detail, '', {
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 2000,
          });
          this.dialogRef.close();
        }
      });
    }
  }
}
