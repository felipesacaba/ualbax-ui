import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Pedido} from '../../model/dto/pedido';
import {PedidoModalComponent} from './pedido.modal/pedido.modal.component';
import {MatDialog} from '@angular/material';
import {PedidoService} from '../../../services/pedido.service';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';
import {Csv} from './pedido.modal/csv';
import {ClienteModel} from '../../model/cliente.model';
import {FormControl, FormGroup} from '@angular/forms';
import {ClienteService} from '../../../services/cliente.service';
import {PedidoParams} from '../../model/dto/pedido.params';
import {DatePipe} from '@angular/common';

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
  columnsToDisplay: string [] = ['idPedido', 'cliente', 'dataPedido', 'dataEntrega', 'valorPedido', 'pagamento', 'acao'];
  expandedElement: Pedido | null;
  totalEmAberto: number = 0;
  totalFechado: number = 0;
  totalGeral: number = 0;
  totalSalgadosFesta: number = 0;
  totalSalgadosNaoFesta: number = 0;
  totalSagados: number = 0;
  disabledCsvButton: any;

  columns: string[] = [
    'ID PEDIDO', 'NOME CLIENTE', 'DATA-PEDIDO', 'PRODUTO', 'QTD.', 'VALOR UNID.', 'TOTAL', 'PAGO'
  ];
  myControl = new FormGroup({
    dataInicial: new FormControl(),
    dataFinal: new FormControl(),
    cliente: new FormControl(),
    idPedido: new FormControl(),
    pagamento: new FormControl(),
  });
  cliente: ClienteModel[];
  pagamento: string [] = ['Pago', 'Pendente', 'Ambos'];


  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) {
  }


  ngOnInit() {
    this.getClientes();
  }

  public getClientes() {
    this.clienteService.findAllCliente().subscribe(
      res => {
        this.cliente = res;
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PedidoModalComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private validaPagamento() {
    let pag: string = this.myControl.get('pagamento').value;
    if (pag === 'Pago') {
      return true;
    } else if (pag === 'Pendente') {
      return false;
    } else {
      return null;
    }
  }

  export(form: Pedido[]) {
    let listaCsv: Csv[] = [];

    form.forEach(p => {
      p.produtos.forEach(prod => {
        let csv = new Csv;

        csv.idPedido = p.idPedido;
        csv.nomeCliente = p.cliente.nomeFantasia;
        csv.dataPedido = p.dataPedido;
        csv.produto = prod.produto;
        csv.quantidade = prod.quantidade;
        csv.valorUnitario = prod.valorUnitario;
        csv.valorPorProduto = prod.valorPorProduto;
        csv.statusPagamento = p.pagamento;


        listaCsv.push(
          csv
        );

      });

    });

    new Angular5Csv(
      listaCsv,
      'Pedidos',
      {
        title: '',
        fieldSeparator: ',',
        headers: this.columns,
        showLabels: true,
        showTitle: true,
        nullToEmptyString: true
      }
    );
  }

  buscarPedidosComParametros() {

    let paramsPesquisa: PedidoParams = new PedidoParams;

    let dataInicial = this.myControl.get('dataInicial').value;
    let dataFinal = this.myControl.get('dataFinal').value;
    let cliente = this.myControl.get('cliente').value;
    let idPedido = this.myControl.get('idPedido').value;

    let dtInicio = this.datepipe.transform(dataInicial, 'yyyy-MM-dd');
    let dtFim = this.datepipe.transform(dataFinal, 'yyyy-MM-dd');


    paramsPesquisa.dataInicial = dtInicio;
    paramsPesquisa.dataFinal = dtFim;
    if (cliente != null) {
      paramsPesquisa.idCliente = cliente.id;
    }
    paramsPesquisa.idPedido = idPedido;
    paramsPesquisa.pagamento = this.validaPagamento();


    this.pedidoService.buscarPedidosComParametros(paramsPesquisa).subscribe(res => {
        this.dataSource = res;
        this.sumarizarDivida(res);
        this.sumarizarFechado(res);
        this.sumarizarGeral(res);
        this.sumTotalSalgadoTrintaCincoGramas(res);
        this.sumTotalSalgados(res);
        this.sumTotalSalgadosFesta(res);
      }
    ), err => {
      console.log('error');
    };
  }

  private sumarizarGeral(res: Pedido[]) {
    var total = 0;
    res.forEach(c => {
      total += c.valorPedido;
    });
    this.totalGeral = total;
  }

  private sumarizarDivida(res: Pedido[]) {
    var total = 0;
    res.forEach(c => {
      if (c.pagamento == false) {
        total += c.valorPedido;
      }
    });
    this.totalEmAberto = total;
  }

  private sumarizarFechado(res: Pedido[]) {
    var total = 0;
    res.forEach(c => {
      if (c.pagamento == true) {
        total += c.valorPedido;
      }
    });
    this.totalFechado = total;
  }


  private sumTotalSalgadoTrintaCincoGramas(res: Pedido[]) {
    var total = 0;
    res.forEach(c => {
      c.produtos.forEach(p => {
        if (p.peso === 0.35) {
          total += p.quantidade;
        }
      });
    });
    this.totalSalgadosNaoFesta = total;
  }

  private sumTotalSalgadosFesta(res: Pedido[]) {
    var total = 0;
    res.forEach(c => {
      c.produtos.forEach(p => {
        if (p.peso === 0.12) {
          total += p.quantidade;
        }
      });
    });
    this.totalSalgadosFesta = total;
  }

  private sumTotalSalgados(res: Pedido[]) {
    var total = 0;
    res.forEach(c => {
      c.produtos.forEach(p => {
        total += p.quantidade;
      });
    });
    this.totalSagados = total;
  }
}
