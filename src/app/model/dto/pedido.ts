import {Cliente} from './cliente';
import {Produto} from './produto';

export class Pedido {
  public id: number;
  public idPedido: number;
  public dataPedido: Date;
  public dataEntrega: Date;
  public cliente: Cliente;
  public produtos: Produto[];
  public valorPedido: number;
  public pagamento: boolean;
}
