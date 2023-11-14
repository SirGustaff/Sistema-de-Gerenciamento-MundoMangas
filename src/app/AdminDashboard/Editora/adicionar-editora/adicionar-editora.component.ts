import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditoraService } from '../../../services/editora.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adicionar-editora',
  templateUrl: './adicionar-editora.component.html',
  styleUrls: ['./adicionar-editora.component.css']
})
export class AdicionarEditoraComponent implements OnInit {

  editoraForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: EditoraService,
    private toastr: ToastrService,
  ) {}


  ngOnInit() {
    this.editoraForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60),]],
      uriFoto: ['', [, Validators.maxLength(255)]]
    })
  }

  onSubmit() {
    if(this.editoraForm.valid) {
      this.service.post(this.editoraForm.value).subscribe({
        next: data => {
          this.toastr.success('Editora adicionada com sucesso', '', {
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 2000,
          });
          this.editoraForm.reset();
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
