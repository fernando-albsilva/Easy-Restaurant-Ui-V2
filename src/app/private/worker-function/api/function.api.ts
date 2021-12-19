import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { FunctionModel } from '../Model/function.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FunctionCommand } from '../commands/function.comand';
import { ErHttpRequestService } from '../../services/er-http-request.service';

@Injectable({
    providedIn: 'any',
})
export class FunctionApi {
    public apiUrl = `https://localhost:5101/Functions`;
    private requestOptions = {
        headers: new HttpHeaders(this.requestService.getAuthorizationHeader()),
    };

    constructor(private http: HttpClient, private requestService: ErHttpRequestService) {}

    public getFunctions(): Observable<Array<FunctionModel>> {
        return this.http
            .get(this.apiUrl + '/GetAll', this.requestOptions)
            .pipe(map((element) => element as Array<FunctionModel>));
    }

    public createFunction = (cmd: FunctionCommand): Observable<any> => {
        cmd.id = 0;
        return this.http.post(`${this.apiUrl}/Create`, cmd, this.requestOptions);
    };

    public updateFunction = (cmd: FunctionCommand): Observable<any> =>
        this.http.put<any>(`${this.apiUrl}/Update`, cmd, this.requestOptions);

    public deleteFunctionsByIds = (idList: Array<string>): Observable<any> => {
        return this.http.post<any>(`${this.apiUrl}/DeleteByList`, idList, this.requestOptions);
    };
}
