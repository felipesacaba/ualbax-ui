import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PedidoService} from '../../../services/pedido.service';
import {ClienteModel} from '../../model/cliente.model';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Itens} from "../Itens";

@Component({
    selector: 'app-consultar-pedido',
    templateUrl: './consultar.pedido.component.html',
    styleUrls: ['./consultar.pedido.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ConsultarPedidoComponent implements OnInit {

    dataSource: any;
    columnsToDisplay: string [] = ['internalCode', 'description', 'unityMeasure', 'referenceCode', 'EANCode', 'price', 'balanceStock', 'validateDate'];
    columns: string[] = ['CÓDICO INTERNO', 'DESCRIÇÃO', 'UNIDADE', 'CÓDIGO DE REFERÊNCIA', 'EAN', 'VALOR', 'ESTOQUE', 'VALIDADE'];

    myControl = new FormGroup({
        referenceCode: new FormControl()

    });

    constructor(
        private pedidoService: PedidoService,
        public datepipe: DatePipe
    ) {
    }

    ngOnInit() {
    }

    buscarPedidosComParametros() {
        let referenceCode = this.myControl.get('referenceCode').value;

        this.pedidoService.buscarItensComParametros(referenceCode).subscribe(res => {
                this.dataSource = res;
            }
        ), err => {
            console.log('error');
        };
    }
}
