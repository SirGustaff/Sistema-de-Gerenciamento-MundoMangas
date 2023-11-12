import { Component, OnInit} from '@angular/core';
import { Produtos, ProductsPage } from '../../../Interfaces/produtos'
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from '../../../services/produto.service';
import { EditarProdutoComponent } from '../editar-produto/editar-produto.component';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {

  productsPage$: Observable<ProductsPage>;

  params: FormGroup = this.formBuilder.group({
      order: new FormControl(''),
      page: new FormControl(1),
      nome: new FormControl(''),
    })
  
    constructor(
      private dialog: MatDialog,
      private service: ProdutoService,
      private formBuilder: FormBuilder,
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
  
    onChangePage() {
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
          alert("Produto deletado com sucesso");
          this.productsPage$ = this.getProduct();
        },
        error: error => {
          alert(error.error.detail);
        }
      });
    }

}
