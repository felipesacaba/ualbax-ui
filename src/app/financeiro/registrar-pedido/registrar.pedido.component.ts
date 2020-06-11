import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RegistarPedidoModel} from '../../model/registar.pedido.model';
import {PedidoService} from '../../../services/pedido.service';
import {ClienteModel} from '../../model/cliente.model';
import {ClienteService} from '../../../services/cliente.service';
import {ProdutosForm} from '../../form/produtos.form';
import {MatSnackBar, MatTable} from '@angular/material';
import {ProdutoService} from '../../../services/produto.service';
import {ProdutoModel} from '../../model/produto.model';
import {SequenceModel} from '../../model/dto/sequence.model';

@Component({
  selector: 'app-ocorrencia',
  templateUrl: './registrar.pedido.component.html',
  styleUrls: ['./registrar.pedido.component.scss']
})
export class RegistrarPedidoComponent implements OnInit {

  objectToSave: RegistarPedidoModel = new RegistarPedidoModel;
  myControl = new FormGroup({
    dataPedido: new FormControl(),
    dataEntrega: new FormControl(),
    clienteModel: new FormControl(),
    produtoModel: new FormControl(),
    valorPedido: new FormControl(),
    pagamento: new FormControl(),
    cliente: new FormControl(),
    produto: new FormControl(),
    valorUnitario: new FormControl(),
    quantidade: new FormControl(),
  });

  cliente: ClienteModel[];
  pagamento: string [] = ['Pago', 'Pendente'];
  prods: ProdutoModel[];
  displayedColumns: string [] = ['produto', 'quantidade', 'recheio', 'valorUnitario', 'valorPorProduto', 'remover'];
  produtos: ProdutosForm[] = [];
  quantidade: number;
  sequence = new SequenceModel();
  produto: ProdutoModel;
  valorUnitario: number;
  storeValorTotal: number = 0;
  quantidadeTotal: number = 0;
  inp: boolean;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild('name', {static: false}) nameField: ElementRef;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.inp = true;
    this.getClientes();
    this.getProdutos();
    this.getSequence();
  }

  private getSequence() {
    this.pedidoService.getSequence().subscribe(
      res => {
        this.sequence = res;
      }
    );
  }

  public getClientes() {
    this.clienteService.findAllCliente().subscribe(
      res => {
        this.cliente = res;
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

  incluirItemListaDePedido() {

    if (this.quantidade != null) {
      let mult = this.produto.valor * this.quantidade;
      let total = this.quantidade;

      this.produtos.push({
        quantidade: this.quantidade,
        produto: this.produto.nome,
        valorUnitario: this.produto.valor,
        recheio: this.produto.recheio,
        peso: this.produto.peso,
        valorPorProduto: mult,
        valorTotalPedido: this.storeValorTotal + mult,
        id: this.produto.id
      });

      this.storeValorTotal = this.storeValorTotal + mult;
      this.quantidadeTotal = this.quantidadeTotal + total;
      this.table.renderRows();
      this.limparCamposProduto();
      this.focus();
    }
  }

  excluirItemListaPedido(element: any) {
    this.produtos.forEach((item, index) => {
      if (item === element) {
        console.log(item);
        this.produtos.splice(index, 1);
      }
    });

    this.storeValorTotal = this.storeValorTotal - element.valorPorProduto;
    this.quantidadeTotal = this.quantidadeTotal - element.quantidade;
    this.table.renderRows();
    console.log(this.produtos);
  }

  focus() {
    this.nameField.nativeElement.focus();
  }

  setValorUnitario() {
    if (this.produto != null) {
      this.valorUnitario = this.produto.valor;
    }
  }

  private limparCamposProduto() {
    this.produto = null;
    this.quantidade = null;
    this.valorUnitario = null;
  }

  private limparCampos() {
    this.myControl.reset();
    this.produtos = [];
    this.quantidadeTotal = 0;
    this.storeValorTotal = 0;
    this.table.renderRows();
  }


  salvarPedido() {
    this.objectToSave.sequence = this.sequence;
    this.objectToSave.dataPedido = this.myControl.get('dataPedido').value;
    this.objectToSave.dataEntrega = this.myControl.get('dataEntrega').value;
    this.objectToSave.cliente = this.myControl.get('cliente').value;
    this.objectToSave.produtos = this.produtos;
    this.objectToSave.pagamento = this.validaPagamento();
    this.objectToSave.valorPedido = this.storeValorTotal;

    this.pedidoService.salvarOcorrencia(this.objectToSave).subscribe(
      c =>
        this.getSequence()

      ,
      err => {
        console.log('error');
      });
    this.limparCampos();
  }

  private validaPagamento() {
    let pag: string = this.myControl.get('pagamento').value;
    if (pag === 'Pago') {
      console.log(pag);
      return true;
    } else {
      console.log(pag);
      return false;
    }
  }


  openSnackBar(message: string, action: string) {

    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
