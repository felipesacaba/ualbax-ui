import {EnderecoModel} from './endereco.model';

export class ClienteModel {
  public id: number;
  public dateIn: Date;
  public nomeFantasia: string;
  public nomeProprietario: string;
  public endereco: EnderecoModel;
  public telefone: string;
}
