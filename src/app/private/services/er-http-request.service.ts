import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'any',
})
export class ErHttpRequestService {
    constructor() {}

    public getAuthorizationHeader = (): any => {
        return { Authorization: `bearer ${localStorage.getItem('access_token')}` };
    };
}
