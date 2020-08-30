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

    dataSource= EL;
    columnsToDisplay: string [] = ['internalCode', 'description', 'unityMeasure', 'referenceCode', 'EANCode', 'price', 'balanceStock', 'validateDate'];

    columns: string[] = ['CÓDICO INTERNO', 'DESCRIÇÃO', 'UNIDADE', 'CÓDIGO DE REFERÊNCIA', 'EAN', 'VALOR', 'ESTOQUE', 'VALIDADE'
    ];
    myControl = new FormGroup({
        referenceCode: new FormControl()

    });
    cliente: ClienteModel[];


    constructor(
        private pedidoService: PedidoService,
        public datepipe: DatePipe
    ) {
    }


    ngOnInit() {
        console.log(EL)
    }


    buscarPedidosComParametros() {
        let referenceCode = this.myControl.get('referenceCode').value;

        this.pedidoService.buscarItensComParametros(referenceCode).subscribe(res => {

                console.log(res)

                this.dataSource.concat(res);

            }
        ), err => {
            console.log('error');
        };
    }
}


const EL: Itens[] = [
    {
        internalCode: '401201.60080',
        description: 'VELA BOSCH RO 898',
        unityMeasure: 'PC',
        referenceCode: '60080',
        EANCode: '7899455901900',
        price: 120,
        balanceStock: 1000,
        validateDate: '2999-12-31'
    }
]

