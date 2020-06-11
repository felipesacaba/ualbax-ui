import {ProdutoModel} from './produto.model';

export class EstoqueModel {

  public id: number;
  public produtoModel: ProdutoModel;
  public quantidade: number;
  public dataAtualizacao: Date;
}
