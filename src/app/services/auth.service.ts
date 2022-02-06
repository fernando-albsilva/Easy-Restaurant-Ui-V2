import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthUserCommand } from 'src/app/private/user/commands/auth-user.command';
import { AuthUserModel } from 'src/app/private/user/model/auth-user.model';
// import * as moment from 'moment';

@Injectable({
    providedIn:'any',
})
export class AuthService {
    public apiUrl = `https://localhost:5101/authorize`;

    constructor(private http: HttpClient) {}

    public login = (email: string, password: string): Observable<AuthUserModel> => {
        const cmd = new AuthUserCommand(email, password);
        return this.http.post(`${this.apiUrl}/login`, cmd).pipe(map((element) => element as AuthUserModel));
    };

    public setSession = (authResult: AuthUserModel): void => {
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('user_roles', authResult.user.role);
        localStorage.setItem('user_userName', authResult.user.userName);
        localStorage.setItem('user_id', authResult.user.id);
        // localStorage.setItem('expires_at', authResult.JSON.stringify(expiresAt.valueOf()));
    };

    public logout = (): void => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_roles');
        localStorage.removeItem('user_userName');
    };

    public isLoggedIn = (): boolean => {
        const tokenInLocalStorage = localStorage.getItem('access_token');
        const roles = localStorage.getItem('user_roles');
        return this.existToken(tokenInLocalStorage, roles);
    };

    public getRole = (): string | null => {
        return localStorage.getItem('user_roles');
    };
   
    public getUserId = (): string | null => {
        return localStorage.getItem('user_id');
    };

    private existToken = (token: string | null, roles: string | null): boolean => {
        return token !== null && token !== '' && roles !== null && roles !== '';
    };

    // isLoggedOut() {
    //     return !this.isLoggedIn();
    // }

    // getExpiration() {
    //     const expiration = localStorage.getItem('expires_at');
    //     const expiresAt = JSON.parse(expiration);
    //     return moment(expiresAt);
    // }
}
