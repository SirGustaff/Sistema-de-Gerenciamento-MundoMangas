import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editoras, PublisherPage } from '../../../Interfaces/editoras';
import { EditoraService } from '../../../services/editora.service';
import { ProdutoService } from '../../../services/produto.service';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Categorias } from '../../../Interfaces/categorias';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {

  productForm: FormGroup;

  publisherPage$: Observable<PublisherPage>

  publisherArray: Array<Editoras> = [];

  categoryArray: Array<Categorias> = [];

  publisherTotalPage: number;

  categoryTotalPage: number;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private editoraService: EditoraService,
    private categoriaService: CategoriaService,
  ) {}

    ngOnInit() {

    this.productForm = this.formBuilder.group({
      nome: [, [Validators.required, Validators.minLength(3), Validators.maxLength(120),]],
      paginas: [, Validators.required],
      uriFoto: [, [Validators.minLength(3), Validators.maxLength(255)]],
      dataPublicacao: [],
      preco: [, [Validators.required]],
      estoque: [],
      ativo: [],
      colorido: [],
      editora: [, [Validators.required]],
      categorias: []
    })
    
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

  onSubmit() {
    if(this.productForm.valid) {
      this.produtoService.post(this.productForm.value).subscribe({
        next: data => {
          alert("Produto Adicionado Com Sucesso")
          this.productForm.reset();
        },

        error: data => {
          alert(data.detail)
          console.log(this.productForm.value)
        }
      });
    }
  }

}
