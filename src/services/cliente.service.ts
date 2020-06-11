import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClienteModel} from '../app/model/cliente.model';

@Injectable({providedIn: 'root'})
export class ClienteService {

  url: string;

  constructor(
    public http: HttpClient
  ) {
    // this.url = `http://localhost:8089/v1/cliente/listar`;
    this.url = `https://fabrisal-app.herokuapp.com/v1/cliente/listar`;
  }

  public findAllCliente() {
    return this.http.get<ClienteModel[]>(`${this.url}`);
  }
}
