import { Component, OnInit } from '@angular/core';
import { EditoraService } from '../../../services/editora.service';
import { Editoras, PublisherPage } from '../../../Interfaces/editoras';
import { Observable, isEmpty, map } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditarEditoraComponent } from '../editar-editora/editar-editora.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-editora',
  templateUrl: './listar-editora.component.html',
  styleUrls: ['./listar-editora.component.css']
})
export class ListarEditoraComponent {

  publisherPage$: Observable<PublisherPage>;

  params: FormGroup = this.formBuilder.group({
    order: new FormControl(''),
    page: new FormControl(1),
    nome: new FormControl(''),
  })

  constructor(
    private dialog: MatDialog,
    private service: EditoraService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    
    this.publisherPage$ = this.getPublisher();
  }

  getPublisher() {
    return this.service.get(this.params.get('nome')?.value, this.params.get('page')?.value, this.params.get('order')?.value);
  }

  selectOrder() {
    this.publisherPage$ = this.getPublisher();
  }

  onChangePage() {
    this.publisherPage$ = this.getPublisher();
  }

  onSearch() {
    this.publisherPage$ = this.getPublisher();
  }

  onEdit(editora: Editoras) {

    let dialogRef = this.dialog.open(EditarEditoraComponent, {
      width: 'auto',
      height: 'auto'
    });

    dialogRef.componentInstance.editora = editora;

    dialogRef.afterClosed().subscribe({
      next: data => {
        if(data == 'atualizou')
          this.publisherPage$ = this.getPublisher();
      },
    });
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe({
      next: data => {
        this.toastr.success('Editora deletada com sucesso', '', {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 2000,
        });
        this.publisherPage$ = this.getPublisher();
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
