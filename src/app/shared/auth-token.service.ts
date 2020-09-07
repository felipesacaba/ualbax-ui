import {Injectable} from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {TokenModel} from "../security/token.model";


@Injectable({
    providedIn: 'root'
})
export class AuthTokenService {
    public getDataToken(): TokenModel {
        let retorno: any = '';
        let obj = jwt_decode(sessionStorage.getItem('key'))
        obj.forEach(res => {
            retorno = res;
        })
        return retorno;
    }
}
