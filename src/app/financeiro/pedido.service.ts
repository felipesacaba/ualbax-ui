import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ItemFilter} from "./item.filter";

@Injectable({providedIn: 'root'})
export class PedidoService {

    url: string;

    constructor(public http: HttpClient
    ) {
        this.url = `http://localhost:5000/api/v1/item?`;
    }


    buscarItensComParametros(itemFilter: ItemFilter) {
        return this.http.get<any[]>(
            `${this.url}`
            + 'BranchCode=' + itemFilter.branchCode
            + '&internalCode=' + itemFilter.internalCode
            + '&description=' + itemFilter.description
            + '&referenceCode= ' + itemFilter.referenceCode
            + '&EANCode=' + itemFilter.EANCode,
            {headers: new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('key'))}
        );
    }

    buscarTodosItens(branchCode: any) {
        return this.http.get<any>(
            `${this.url}` + 'BranchCode= ' + branchCode + '&internalCode=""&description=""&referenceCode=60080&EANCode=""',
            {headers: new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('key'))}
        );
    }
}
