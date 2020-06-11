import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegistarPedidoModel} from '../../model/registar.pedido.model';

@Injectable({providedIn: 'root'})
export class RegistrarPedidoService {

  constructor(public http: HttpClient
  ) {
  }

}
