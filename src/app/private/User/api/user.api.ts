import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';
import { UserFlatModel } from '../model/auth-user.model';
import { ErHttpRequestService } from '../../services/er-http-request.service';
import { UserCommand } from '../commands/auth-user.command';

@Injectable()
export class UserApi {
    public apiUrl = `https://localhost:5101/User`;
    private requestOptions = {
        headers: new HttpHeaders(this.requestService.getAuthorizationHeader()),
    };

    constructor(private http: HttpClient, private requestService: ErHttpRequestService) {}

    public getUsers(): Observable<Array<UserFlatModel>> {
        return this.http
            .get(this.apiUrl + '/GetAll', this.requestOptions)
            .pipe(map((element) => element as Array<UserFlatModel>));
    }

    //TODO
    // implementar this.requestOptions
    public createUser = (cmd: UserCommand): Observable<any> => {
        cmd.id = UUID.UUID();
        return this.http.post(`${this.apiUrl}/Create`, cmd, this.requestOptions);
    };

    //TODO
    // implementar this.requestOptions
    // public updateProduct = (cmd: UserCommand): Observable<any> => {
    //     return this.http.put<any>(`${this.apiUrl}/Update`, cmd);
    // };

    //TODO
    // implementar this.requestOptions
    public deleteUser = (id: string): Observable<any> => {
        let params = new HttpParams();
        params = params.append('Id', id);

        return this.http.delete<any>(`${this.apiUrl}/Delete`, { params: params });
    };

    //TODO
    // implementar this.requestOptions
    public deleteUsersByIds = (idList: Array<string>): Observable<any> => {
        return this.http.post<any>(`${this.apiUrl}/DeleteByList`, idList);
    };
}
