import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class LoginService {

    url: string;

    constructor(
        public http: HttpClient
    ) {

        this.url = `http://localhost:5000/api/v1/login`;
    }

    login(username: string, password: string) {

        return this.http.post<any>(`${this.url}`, {login: username, password: password});
    }
}
