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
        private _messages: MessagesKeys,
        private _userApi: UserApi,
        private _auth: AuthService,
        private _router: Router,
        private _dialogService: DialogService,
        private _erMessagesSnackbar: ErMessages,
        private erMessagesSnackbar: ErMessages,
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

    public deleteUser = (selectedItems: any): void => {
        this.handleUserDelete(selectedItems);
    };

    public updateUser = (selectedItem: any): void => {
        const dialogData = selectedItem as UserCommand;
        const dialogRef = this.createDialog(dialogData);

        dialogRef.afterClosed().subscribe((response: any) => {
            const canUpdate = response && response.type === 'update';
            if (canUpdate) {
                this.handleUserUpdate(response.data);
            }
        });
    };

    private getUsers = (): void => {
        this._userApi.getUsers().subscribe(
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
        this._userApi.createUser(userCommand).subscribe(
            (result) => {
                this.getUsers();
                this._erMessagesSnackbar.openSnackBar(this._messages.successfullyCreated, 'sucess');
            },
            (error) => {
                console.log(error);
            },
        );
    };

    private handleUserDelete = (usersIds: Array<string>) => {
        this._userApi.deleteUsersByIds(usersIds).subscribe(
            (result) => {
                this.getUsers();
                this.erMessagesSnackbar.openSnackBar(this._messages.successfullyDeleted, 'sucess');
            },
            (error) => {
                console.log(error);
            },
        );
    };

    private handleUserUpdate = (userCommand: UserCommand) => {
        this._userApi.updateUser(userCommand).subscribe(
            (result) => {
                this.getUsers();
                this.erMessagesSnackbar.openSnackBar(this._messages.successfullyUpdated, 'sucess');
            },
            (error) => {
                console.log(error);
            },
        );
    };
}
