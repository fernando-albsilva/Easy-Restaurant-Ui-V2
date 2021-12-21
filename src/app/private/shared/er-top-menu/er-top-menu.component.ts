import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
    selector: 'er-top-menu',
    templateUrl: 'er-top-menu.component.html',
    styleUrls: ['er-top-menu.component.scss'],
})
export class ErTopMenu implements OnInit {
    public user: string | null = '';

    constructor(private auth: AuthService, public messages: MessagesKeys) {}

    ngOnInit(): void {
        this.user = localStorage.getItem('user_userName');
    }

    public doLogout = (): void => {
        this.auth.logout();
    };

    public canAcessUserPage = (): boolean => {
        const role = this.auth.getRole();
        const isAdmin = role?.toLowerCase().includes('admin');
        return isAdmin ? true : false;
    };
}
