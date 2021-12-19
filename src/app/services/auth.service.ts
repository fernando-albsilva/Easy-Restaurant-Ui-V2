import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserCommand } from '../private/User/commands/auth-user.command';
import { AuthUserModel } from '../private/User/model/auth-user.model';

import { map } from 'rxjs/operators';
// import * as moment from 'moment';

@Injectable()
export class AuthService {
    public apiUrl = `https://localhost:5101/authorize`;

    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        const cmd = new AuthUserCommand(email, password);
        return this.http.post(`${this.apiUrl}/login`, cmd).pipe(map((element) => element as AuthUserModel));
    }

    public setSession(authResult: AuthUserModel) {
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem('user_roles', authResult.user.role);
        localStorage.setItem('user_userName', authResult.user.userName);
        // localStorage.setItem('expires_at', authResult.JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_roles');
        localStorage.removeItem('user_userName');
    }

    public isLoggedIn() {
        const tokenInLocalStorage = localStorage.getItem('access_token');
        const roles = localStorage.getItem('user_roles');
        return this.existToken(tokenInLocalStorage, roles);
    }

    private existToken(token: string | null, roles: string | null) {
        return token !== null && token !== '' && roles !== null && roles !== '';
    }

    // isLoggedOut() {
    //     return !this.isLoggedIn();
    // }

    // getExpiration() {
    //     const expiration = localStorage.getItem('expires_at');
    //     const expiresAt = JSON.parse(expiration);
    //     return moment(expiresAt);
    // }
}
