import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { FunctionModel } from '../Model/function.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FunctionCommand } from '../commands/function.comand';

@Injectable({
    providedIn: 'any',
})
export class FunctionApi {
    public apiUrl = `https://localhost:5101/Functions`;

    constructor(private http: HttpClient) {}

    public getFunctions(): Observable<Array<FunctionModel>> {
        return this.http.get(this.apiUrl + '/GetAll').pipe(map((element) => element as Array<FunctionModel>));
    }

    public createFunction = (cmd: FunctionCommand): Observable<any> => {
        cmd.id = 0;
        return this.http.post(`${this.apiUrl}/Create`, cmd);
    };

    public updateFunction = (cmd: FunctionCommand): Observable<any> => this.http.put<any>(`${this.apiUrl}/Update`, cmd);

    public deleteFunctionsByIds = (idList: Array<string>): Observable<any> => {
        return this.http.post<any>(`${this.apiUrl}/DeleteByList`, idList);
    };
}
