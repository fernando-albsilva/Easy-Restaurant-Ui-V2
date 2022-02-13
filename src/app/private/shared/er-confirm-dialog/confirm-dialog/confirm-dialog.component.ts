import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditTableDialog } from 'src/app/private/check-management/components/management-tables/edit-table-dialog/edit-table-dialog.component';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialog implements OnInit {
    public messageDisplayed: string = this.messages.beCarefulWithDecision;
    public styleToUse: string = '';

    constructor(
        public messages: MessagesKeys,
        public dialogRef: MatDialogRef<EditTableDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        dialogRef.disableClose = true;
    }
    ngOnInit(): void {
        if (this.data) {
            this.messageDisplayed = this.data.messageDisplayed;
            this.styleToUse = this.data.styleToUse;
        }
    }

    public onCancel = (): void => {
        this.dialogRef.close(false);
    };

    public onConfirm = (): void => {
        this.dialogRef.close(true);
    };
}
