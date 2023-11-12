import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Categorias, CategoryPage } from '../../../Interfaces/categorias';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {

  categoryPage$: Observable<CategoryPage>

  first: number = 1;

  params: FormGroup = this.formBuilder.group({
    order: new FormControl(''),
    page: new FormControl(1),
    nome: new FormControl(''),
  })

  constructor(
    private dialog: MatDialog,
    private service: CategoriaService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.categoryPage$ = this.getCategory();
  }

  getCategory() {
    return this.service.get(this.params.get('nome')?.value, this.params.get('page')?.value, this.params.get('order')?.value);
  }

  selectOrder() {
    this.categoryPage$ = this.getCategory();
  }

  onChangePage(event: any) {
    this.first = event.first;
    this.params.controls['page'].setValue(event.page + 1);
    this.categoryPage$ = this.getCategory();
  }


  onSearch() {
    this.categoryPage$ = this.getCategory()
  }

  onEdit(categoria: Categorias) {

    const dialogRef = this.dialog.open(EditarCategoriaComponent)

    dialogRef.componentInstance.categoria = categoria;

    dialogRef.afterClosed().subscribe({
      next: data => {
        if(data == 'atualizou')
          this.categoryPage$ = this.getCategory();
      },
    });
  }

  onDelete(id: number) {
    this.service.delete(id).subscribe({
      next: data => {
        this.toastr.success('Categoria deletada com sucesso', '', {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 2000,
        });
        this.categoryPage$ = this.getCategory();
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
