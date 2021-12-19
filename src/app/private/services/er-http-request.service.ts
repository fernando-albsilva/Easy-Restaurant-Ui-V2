import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErHttpRequestService {
    constructor() {}

    public getAuthorizationHeader = (): any => {
        return { Authorization: `bearer ${localStorage.getItem('access_token')}` };
    };
}
