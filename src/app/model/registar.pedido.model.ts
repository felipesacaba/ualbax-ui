import {ClienteModel} from './cliente.model';
import {ProdutoModel} from './produto.model';
import {ProdutosForm} from '../form/produtos.form';
import {SequenceModel} from './dto/sequence.model';

export class RegistarPedidoModel {

  public dataPedido: Date;
  public dataEntrega: Date;
  public sequence: SequenceModel;
  public produtoModel: ProdutoModel;
  public cliente: ClienteModel;
  public produtos: ProdutosForm[];
  public valorPedido: number;
  public pagamento: boolean;
}
