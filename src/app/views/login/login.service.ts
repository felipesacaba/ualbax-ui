import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LoginService {

    url: string;

    constructor(
        public http: HttpClient
    ) {
        this.url = `http://localhost:5000/api/v1/login`;
    }

    login(username: string, password: string) {
        return this.http
            .post<any>(`${this.url}`, {login: username, password: password})
            .pipe(tap(res => {
                const token = res.token;
                this.setAttributesSessionStorage(token);
            }));
    }

    setAttributesSessionStorage(token: string) {
        sessionStorage.setItem('key', token);
    }

    logout() {
        sessionStorage.clear();
    }
}
