import { Component, OnInit} from '@angular/core';
import { Produtos, ProductsPage } from '../../../Interfaces/produtos'
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from '../../../services/produto.service';
import { EditarProdutoComponent } from '../editar-produto/editar-produto.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {

  productsPage$: Observable<ProductsPage>;

  first: number = 1;

  params: FormGroup = this.formBuilder.group({
      order: new FormControl(''),
      page: new FormControl(1),
      nome: new FormControl(''),
    })
  
    constructor(
      private dialog: MatDialog,
      private service: ProdutoService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
    ) { }
  
    ngOnInit() {
      this.productsPage$ = this.getProduct();
    }
  
    getProduct() {
      return this.service.get(this.params.get('nome')?.value, this.params.get('page')?.value, this.params.get('order')?.value);
    }
  
    selectOrder() {
      this.productsPage$ = this.getProduct();
    }
  
    onChangePage(event: any) {
      this.first = event.first;
      this.params.controls['page'].setValue(event.page + 1);
      this.productsPage$ = this.getProduct();
    }

    onSearch() {
      this.productsPage$ = this.getProduct()
    }

    onEdit(produto: Produtos) {
      const dialogRef = this.dialog.open(EditarProdutoComponent)
  
      dialogRef.componentInstance.produto = produto;
  
      dialogRef.afterClosed().subscribe({
        next: data => {
          if(data == 'atualizou')
            this.productsPage$ = this.getProduct();
        },
      });
    }

    onDelete(id: number) {
      this.service.delete(id).subscribe({
        next: data => {
          this.toastr.success('Produto deletado com sucesso', '', {
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 2000,
          });
          this.productsPage$ = this.getProduct();
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
