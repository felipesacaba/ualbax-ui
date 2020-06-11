import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProdutoModel} from '../app/model/produto.model';
import {ProdutosForm} from '../app/form/produtos.form';
import {EstoqueModel} from '../app/model/estoque.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EstoqueService {

  url: string;

  constructor(
    public http: HttpClient
  ) {
    // this.url = `http://localhost:8089/v1/estoque/`;
    this.url = `https://fabrisal-app.herokuapp.com/v1/estoque/`;
  }

  public updateEstoque(produtosForm: ProdutosForm) {
    return this.http.post<ProdutoModel>(`${this.url}` + '/ajustar-positivo', produtosForm);
  }

  getEstoque(): Observable<EstoqueModel[]> {
    return this.http.get<EstoqueModel[]>(`${this.url}`);
  }
}
