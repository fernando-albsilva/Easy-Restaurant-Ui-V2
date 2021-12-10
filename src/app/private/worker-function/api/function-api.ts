import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { FunctionModel } from './../Model/FunctionModel';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class FunctionApi {
    public apiUrl = `https://localhost:5101/Functions`;

    constructor(private http: HttpClient) {}

    public getFunctions(): Observable<Array<FunctionModel>> {
        return this.http.get(this.apiUrl + '/GetAll').pipe(map((element) => element as Array<FunctionModel>));
    }

    public createFunction = (cmd: FunctionModel): Observable<any> => {
        cmd.id = 0;
        return this.http.post(`${this.apiUrl}/Create`, cmd);
    };

    public updateFunction = (cmd: FunctionModel): Observable<any> => {
        return this.http.put<any>(`${this.apiUrl}/Update`, cmd);
    };

    // public deleteFunction = (id:string):Observable<any> => {

    //   let params = new HttpParams();
    //   params = params.append('Id',id);

    //   return this.http.delete<any>(`${ this.apiUrl }/Delete`, { params : params});
    // }

    public deleteFunctionsByIds = (idList: Array<string>): Observable<any> => {
        return this.http.post<any>(`${this.apiUrl}/DeleteByList`, idList);
    };
}
