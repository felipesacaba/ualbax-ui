import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class MenuService {

    url: string;
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.W3siY29kQ2xpZW50ZSI6MTQ4LCJmaWxpYWwiOiIxMDAiLCJoYWJpbGl0YVRyYW4iOiJubyIsImhhYmlsaXRhUGd0byI6Im5vIiwicGVyZmlsIjoiMSIsImVNYWlsIjoid2FuZGVybGVpLm1hY2Vkb0Bob3RtYWlsLmNvbSIsIm5vbWVDbGllbnRlIjoiUEVUUk9CUkFTIERJU1RSSUJVSURPUkEgUy5BIiwiZXhwaXJlRGF0ZSI6IjIwMjAtMDgtMjNUMTg6Mjk6MDguNTQ4WiJ9XQ.tsj6qjgxfQWdELsKHaN2gdpEenO9bZatVrzakMLKGHo'

    constructor(public http: HttpClient
    ) {
        this.url = `http://localhost:5000/api/v1/menu`;
    }

    public menuList() {

        return this.http.get<any[]>(
            `${this.url}`,
            {headers: new HttpHeaders().set("Authorization", "Bearer " + this.token )}
        );
    }
}
