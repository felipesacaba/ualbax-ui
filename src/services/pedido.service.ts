import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegistarPedidoModel} from '../app/model/registar.pedido.model';
import {Pedido} from '../app/model/dto/pedido';
import {PedidoParams} from '../app/model/dto/pedido.params';
import {SequenceModel} from '../app/model/dto/sequence.model';

@Injectable({providedIn: 'root'})
export class PedidoService {

  constructor(public http: HttpClient
  ) {
  }

  public salvarOcorrencia(ocorrenciaModel: RegistarPedidoModel) {
    return this.http.post<RegistarPedidoModel>(`https://fabrisal-app.herokuapp.com/v1/pedido/registrar-pedido`, ocorrenciaModel);
    // return this.http.post<RegistarPedidoModel>(`http://localhost:8089/v1/pedido/registrar-pedido`, ocorrenciaModel);
  }


  public  getSequence() {
    // return this.http.get<SequenceModel>(`http://localhost:8089/v1/pedido/sequence`);
    return this.http.get<SequenceModel>(`https://fabrisal-app.herokuapp.com/v1/pedido/sequence`);
  }

  buscarPedidosComParametros(paramsPesquisa: PedidoParams) {

    // return this.http.post<Pedido[]>(`http://localhost:8089/v1/pedido`, {
    //   'dataInicial': paramsPesquisa.dataInicial.toString(),
    //   'dataFinal': paramsPesquisa.dataFinal.toString(),
    //   'idPedido': paramsPesquisa.idPedido,
    //   'idCliente': paramsPesquisa.idCliente,
    //   'pagamento': paramsPesquisa.pagamento,
    // });

    return this.http.post<Pedido[]>(`https://fabrisal-app.herokuapp.com/v1/pedido`, {
      'dataInicial': paramsPesquisa.dataInicial.toString(),
      'dataFinal': paramsPesquisa.dataFinal.toString(),
      'idPedido': paramsPesquisa.idPedido,
      'idCliente': paramsPesquisa.idCliente,
      'pagamento': paramsPesquisa.pagamento,
    });
  }
}
