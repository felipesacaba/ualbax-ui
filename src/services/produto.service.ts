import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProdutoModel} from '../app/model/produto.model';

@Injectable({providedIn: 'root'})
export class ProdutoService {

  url: string;

  constructor(
    public http: HttpClient
  ) {
    // this.url = `http://localhost:8089/v1/produto/listar`;
    this.url = `https://fabrisal-app.herokuapp.com/v1/produto/listar`;
  }

  public findAllProdutos() {
    return this.http.get<ProdutoModel[]>(`${this.url}`);
  }

}
