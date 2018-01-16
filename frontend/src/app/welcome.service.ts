import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WelcomeService{
    constructor(private http: HttpClient) {

    }

    public getWelcomeMessage() : Observable<string> {
        return this.http.get('/api/welcome', {responseType: 'text'});
    }
}