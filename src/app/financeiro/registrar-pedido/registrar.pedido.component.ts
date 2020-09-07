import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PedidoService} from '../pedido.service';
import {ItensForm} from '../form-model/itens.form';
import {MatSnackBar, MatTable} from '@angular/material';
import {Item} from "../Item";
import {AuthTokenService} from "../../shared/auth-token.service";
import {PedidoForm} from "../form-model/pedido.form";
import {ClientForm} from "../form-model/client.form";

@Component({
    selector: 'app-ocorrencia',
    templateUrl: './registrar.pedido.component.html',
    styleUrls: ['./registrar.pedido.component.scss']
})
export class RegistrarPedidoComponent implements OnInit {

    myControl = new FormGroup({
        dataPedido: new FormControl(),
        quantidade: new FormControl(),
        item: new FormControl(),
        valorUnitario: new FormControl()
    });

    displayedColumns: string [] = ['produto', 'quantidade', 'valorUnitario', 'valorPorProduto', 'remover'];
    itens: Item[];
    item: Item;
    produtos: ItensForm[] = [];
    quantidade: number;
    valorUnitario: number;
    storeValorTotal: number = 0;
    quantidadeTotal: number = 0;

    @ViewChild(MatTable, {static: true}) table: MatTable<any>;
    @ViewChild('name', {static: false}) nameField: ElementRef;

    constructor(
        private pedidoService: PedidoService,
        private _snackBar: MatSnackBar,
        private authTokenService: AuthTokenService
    ) {
    }

    ngOnInit() {
        this.getProdutos();
    }

    private getProdutos() {
        this.pedidoService.buscarTodosItens(this.authTokenService.getDataToken().filial).subscribe(
            res => {
                this.itens = res;
            }
        );
    }

    setValorUnitario() {
        if (this.item != null) {
            this.valorUnitario = this.item.price;
        }
    }

    incluirItemListaDePedido() {
        if (this.quantidade != null) {
            let mult = this.item.price * this.quantidade;
            let total = this.quantidade;

            this.produtos.push({
                quantidade: this.quantidade,
                produto: this.item.description,
                valorUnitario: this.item.price,
                valorPorProduto: mult,
                valorTotalPedido: this.storeValorTotal + mult,
                id: this.item.internalCode
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
                this.produtos.splice(index, 1);
            }
        });

        this.storeValorTotal = this.storeValorTotal - element.valorPorProduto;
        this.quantidadeTotal = this.quantidadeTotal - element.quantidade;
        this.table.renderRows();
    }

    focus() {
        this.nameField.nativeElement.focus();
    }

    private limparCamposProduto() {
        this.item = null;
        this.quantidade = null;
        this.valorUnitario = null;
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 3000,
        });
    }

    salvarPedido() {
        let client = new ClientForm();
        client.id = this.authTokenService.getDataToken().codCliente;
        client.name = this.authTokenService.getDataToken().nomeCliente;

        let pedidoForm = new PedidoForm();
        pedidoForm.dateRegister = this.myControl.get('dataPedido').value;
        pedidoForm.itensForm = this.produtos;
        pedidoForm.client = client;

        //call service
    }
}
