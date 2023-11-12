import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Editoras, PublisherPage } from '../../../Interfaces/editoras';
import { EditoraService } from '../../../services/editora.service';
import { ProdutoService } from '../../../services/produto.service';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Categorias } from '../../../Interfaces/categorias';
import { CategoriaService } from '../../../services/categoria.service';
import { Produtos } from '../../../Interfaces/produtos';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent {
  
  @Input() produto: Produtos;

  productForm: FormGroup;

  publisherPage$: Observable<PublisherPage>

  publisherArray: Array<Editoras> = [];

  categoryArray: Array<Categorias> = [];

  publisherTotalPage: number;

  categoryTotalPage: number;

  constructor(
    private dialogRef: MatDialogRef<EditarProdutoComponent>,
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private editoraService: EditoraService,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
  ) {}

    ngOnInit() {

    this.productForm = this.formBuilder.group({
      id: [this.produto.id],
      nome: [this.produto.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(120),]],
      paginas: [this.produto.paginas, Validators.required],
      uriFoto: [this.produto.uriFoto, [Validators.minLength(3), Validators.maxLength(255)]],
      dataPublicacao: [this.produto.dataPublicacao,],
      preco: [this.produto.preco, [Validators.required]],
      estoque: [this.produto.estoque,],
      totalVendido: [this.produto.totalVendido],
      ativo: [this.produto.ativo,],
      colorido: [this.produto.colorido,],
      editora: [null],
      categorias: [this.produto.categorias,]
    });
    
    this.editoraService.get('', 1, 'OrderByNameASC').pipe(
      concatMap(firstPage => {
        this.publisherTotalPage = firstPage.totalPages;
        const pageNumbers = Array.from({length: this.publisherTotalPage}, (_, i) => i + 1);
        return of(...pageNumbers).pipe(
          concatMap(i => this.editoraService.get('', i, 'OrderByNameASC'))
        );
      })
    ).subscribe(page => {
      for (let item of page.items) {
        if (item !== undefined) {
          this.publisherArray.push(item);
        }
      }
    });

    this.categoriaService.get('', 1, 'OrderByNameASC').pipe(
      concatMap(firstPage => {
        this.categoryTotalPage = firstPage.totalPages;
        const pageNumbers = Array.from({length: this.categoryTotalPage}, (_, i) => i + 1);
        return of(...pageNumbers).pipe(
          concatMap(i => this.categoriaService.get('', i, 'OrderByNameASC'))
        );
      })
    ).subscribe(page => {
      for (let item of page.items) {
        if (item !== undefined) {
          this.categoryArray.push(item);
        }
      }
    });
  }

  updateProduct() {
    if (this.productForm.valid && this.productForm.valueChanges) {
      this.produtoService.put(this.productForm.value).subscribe({
        next: data => {
          this.toastr.success('Produto atualizado com sucesso', '', {
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 2000,
          });
          this.dialogRef.close('atualizou');
        },
        error: data => {
          this.toastr.error('O produto não foi atualizado', '', {
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
