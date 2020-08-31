import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class MenuService {

    url: string;

    constructor(public http: HttpClient
    ) {
        this.url = `http://localhost:5000/api/v1/menu`;
    }

    public menuList() {

        return this.http.get<any[]>(
            `${this.url}`,
            {headers: new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('key'))}
        );
    }
}
