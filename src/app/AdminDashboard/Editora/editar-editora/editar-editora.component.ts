import { Component, Input } from '@angular/core';
import { Editoras } from '../../../Interfaces/editoras';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditoraService } from '../../../services/editora.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-editora',
  templateUrl: './editar-editora.component.html',
  styleUrls: ['./editar-editora.component.css']
})
export class EditarEditoraComponent {

  @Input() editora: Editoras;

  editForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditarEditoraComponent>,
    private formBuilder: FormBuilder,
    private service: EditoraService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [this.editora.id],
      nome: [this.editora.nome,[Validators.required, Validators.minLength(1), Validators.maxLength(60),]],
      uriFoto: [this.editora.uriFoto, [ Validators.maxLength(255)]]
    })
  }

  updatePublisher() {
    if (this.editForm.get('uriFoto')?.value  == '')
      this.editForm.get('uriFoto')?.setValue(null);
    if (this.editForm.valid && this.editForm.valueChanges) {
      this.service.put(this.editForm.value).subscribe({
        next: data => {
          this.toastr.success('Editora atualizada com sucesso', '', {
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
