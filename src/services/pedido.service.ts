import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PedidoService {

    url: string;

    constructor(public http: HttpClient
    ) {
        this.url = `http://localhost:5000/api/v1/item?`;
    }


    buscarItensComParametros(referenceCode: any) {
        return this.http.get<any[]>(
            `${this.url}` + 'BranchCode=100&internalCode=""&description=""&referenceCode= ' + referenceCode + ' &EANCode=""',
            {headers: new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('key'))}
        );
    }
}
