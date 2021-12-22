import { Component, OnInit } from '@angular/core';
import { UserApi } from './api/user.api';

import { UserFlatModel } from './model/auth-user.model';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    public erPageListContext: string = 'user';
    public erPageListOperationsPermited: Array<string> = ['add', 'edit', 'delete'];

    public users: Array<UserFlatModel> = [];

    private _byTypeProperty: string = 'userName';

    constructor(private userApi: UserApi) {}

    ngOnInit(): void {
        //TODO
        // adicionar verificacao de rola se for admin ok, se nao redirecionar para uma pagina onde avisa ue nao tem permissao

        this.userApi.getUsers().subscribe(
            (requestResult) => {
                this.users = requestResult;
            },
            (error) => {
                throw new Error(error);
            },
        );
    }

    //TODO
    // implementar metodo de adicionar usuario
    public addUser = () => {};

    //TODO
    // implementar metodo de deletar usuario
    public deleteUser = (selectedItems: any) => {};

    //TODO
    // implementar metodo de alterar usuario
    public updateUser = (selectedItem: any) => {};
}
