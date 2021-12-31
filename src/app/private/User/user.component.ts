import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { UserApi } from './api/user.api';
import { UserCommand } from './commands/auth-user.command';
import { CreateEditUserDialog } from './components/create-edit-user-dialog/create-edit-user-dialog.component';

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

    constructor(
        public userApi: UserApi,
        private _auth: AuthService,
        private _router: Router,
        private _dialogService: DialogService,
        private _erMessagesSnackbar: ErMessages,
        private _messages: MessagesKeys,
    ) {}

    ngOnInit(): void {
        const userRoles = this._auth.getRole();

        if (!userRoles?.includes('admin')) {
            this._router.navigate(['/private/worker-function']);
        } else {
            this.getUsers();
        }
    }

    public addUser = (): void => {
        const dialogRef = this.createDialog();
        dialogRef.afterClosed().subscribe((response: any) => {
            const canSave = response && response.type === 'save';
            if (canSave) {
                this.handleUserCreation(response.data);
            }
        });
    };

    //TODO
    // implementar metodo de deletar usuario
    public deleteUser = (selectedItems: any): void => {};

    //TODO
    // implementar metodo de alterar usuario
    public updateUser = (selectedItem: any): void => {};

    private getUsers = (): void => {
        this.userApi.getUsers().subscribe(
            (requestResult) => {
                this.users = requestResult;
            },
            (error) => {
                throw new Error(error);
            },
        );
    };

    private createDialog = (dialogData?: UserFlatModel): MatDialogRef<unknown, any> => {
        const height = '550px';
        const width = '500px';

        if (dialogData) {
            const dialogRef = this._dialogService.createDialog(
                CreateEditUserDialog,
                height,
                width,
                dialogData as UserCommand,
            );
            return dialogRef;
        } else {
            const dialogRef = this._dialogService.createDialog(CreateEditUserDialog, height, width);
            return dialogRef;
        }
    };

    private handleUserCreation = (userCommand: UserCommand): void => {
        this.userApi.createUser(userCommand).subscribe(
            (result) => {
                this.getUsers();
                this._erMessagesSnackbar.openSnackBar(this._messages.successfullyCreated, 'sucess');
            },
            (error) => {
                console.log(error);
            },
        );
    };
}
