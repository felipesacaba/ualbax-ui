import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PedidoService} from '../pedido.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ItemFilter} from "../item.filter";
import {AuthTokenService} from "../../shared/auth-token.service";

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
    columns: string[] = ['CÓDIGO INTERNO', 'DESCRIÇÃO', 'UNIDADE', 'CÓDIGO DE REFERÊNCIA', 'EAN', 'VALOR', 'ESTOQUE', 'VALIDADE'];

    myControl = new FormGroup({
        internalCode: new FormControl(),
        description: new FormControl(),
        referenceCode: new FormControl(),
        EANCode: new FormControl()

    });

    constructor(
        private pedidoService: PedidoService,
        private authTokenService: AuthTokenService
    ) {
    }

    ngOnInit() {
    }

    findItensByParams() {

        let filterParams = this.mountRequestParams();

        // this.pedidoService.buscarItensComParametros(filterParams).subscribe(res => {
        //         this.dataSource = res;
        //     }
        // ), err => {
        //     console.log('error');
        // };
    }

    private mountRequestParams() {
        let item: ItemFilter = new ItemFilter
        item.branchCode = this.authTokenService.getDataToken().filial;
        item.internalCode = this.myControl.get('internalCode').value;
        item.description = this.myControl.get('description').value;
        item.referenceCode = this.myControl.get('referenceCode').value;
        item.EANCode = this.myControl.get('EANCode').value;

        console.log(item)
        return item;
    }
}
