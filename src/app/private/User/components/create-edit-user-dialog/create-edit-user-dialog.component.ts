import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UUID } from 'angular2-uuid';
import { ErMessages } from 'src/app/services/er-messages.service';

import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { ObjectService } from 'src/app/services/object.service';
import { UserCommand } from '../../commands/auth-user.command';

@Component({
    selector: 'create-edit-user-dialog',
    templateUrl: 'create-edit-user-dialog.component.html',
    styleUrls: ['create-edit-user-dialog.component.scss'],
})
export class CreateEditUserDialog implements OnInit {
    public userCommand: UserCommand = new UserCommand();
    public isNew: boolean = true;

    constructor(
        public messages: MessagesKeys,
        public dialogRef: MatDialogRef<CreateEditUserDialog>,
        private _objectService: ObjectService,
        private _erMessagesSnackbar: ErMessages,
        @Inject(MAT_DIALOG_DATA) public data: UserCommand,
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.isNew = false;
            this.userCommand.id = this.data.id;
            this.userCommand.userName = this.data.userName;
            this.userCommand.role = this.data.role;
        } else {
            this.userCommand.id = UUID.UUID();
        }
    }

    public onCancel = (): void => {
        this.dialogRef.close();
    };

    public onSave = (): void => {
        const isEmpty = this.verifyIfInputValueIsEmpty();
        if (this.isNew && !isEmpty) {
            this.dialogRef.close({ data: this.userCommand, type: 'save' });
        } else if (!isEmpty) {
            this.dialogRef.close({ data: this.userCommand, type: 'update' });
        } else {
            this._erMessagesSnackbar.openSnackBar(this.messages.stillRemainFieldToBeFiled, 'warning');
        }
    };

    private verifyIfInputValueIsEmpty = (): boolean => {
        return this._objectService.isAnyPropertyEmpty(this.userCommand);
    };
}
