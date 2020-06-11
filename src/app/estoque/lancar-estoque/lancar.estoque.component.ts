import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProdutoModel} from '../../model/produto.model';
import {ProdutoService} from '../../../services/produto.service';
import {ProdutosForm} from '../../form/produtos.form';
import {EstoqueService} from '../../../services/estoque.service';
import {EstoqueModel} from '../../model/estoque.model';
import {MatTable} from '@angular/material';

@Component({
  selector: 'app-lancar-estoque',
  templateUrl: './lancar.estoque.component.html',
  styleUrls: ['./lancar.estoque.component.scss']
})
export class LancarEstoqueComponent implements OnInit {

  objectToSave: ProdutosForm = new ProdutosForm();

  myControl = new FormGroup({
    produto: new FormControl(),
    quantidade: new FormControl(),
  });

  produto: ProdutosForm;
  prods: ProdutoModel[];
  estoque: EstoqueModel[] = [];
  displayedColumns: string [] = ['nome', 'quantidade'];
  totalSalgados: number = 0;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(
    private produtoService: ProdutoService,
    private estoqueService: EstoqueService,
  ) {
  }

  ngOnInit() {
    this.getProdutos();
    this.getEstoque();
  }

  private getEstoque() {
    let sum: number;
    this.estoqueService.getEstoque().subscribe(
      c => {
        this.estoque = c;
        sum = c.reduce((total, atual) => total + atual.quantidade, 0);
        this.totalSalgados = sum;
      }
    );
  }

  private getProdutos() {
    this.produtoService.findAllProdutos().subscribe(
      res => {
        this.prods = res;
      }
    );
  }

  update() {
    this.objectToSave.id = this.produto.id;
    this.objectToSave.quantidade = this.myControl.get('quantidade').value;
    this.estoqueService.updateEstoque(this.objectToSave).subscribe(
      res => {
      }
    ), err => {
      console.log('error');
    };
    this.getProdutos();

  }
}

