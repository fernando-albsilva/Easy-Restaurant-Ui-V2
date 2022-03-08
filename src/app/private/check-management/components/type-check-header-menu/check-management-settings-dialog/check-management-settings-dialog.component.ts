import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { CheckManagementSettings } from '../../../model/check-management.model';

@Component({
    selector: 'app-check-management-settings-dialog',
    templateUrl: './check-management-settings-dialog.component.html',
    styleUrls: ['./check-management-settings-dialog.component.scss'],
})
export class CheckManagementSettingsDialogComponent implements OnInit {
    public checkManagementSetting: CheckManagementSettings = new CheckManagementSettings();

    constructor(
        public messages: MessagesKeys,
        public dialogRef: MatDialogRef<CheckManagementSettingsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.checkManagementSetting = this.data;
        } 
    }

    public onCancel = (): void => {
        this.dialogRef.close();
    };

    public onSave = (): void => {
        // const isEmpty = this.verifyIfInputValueIsEmpty();
        // if (this.isNew && !isEmpty) {
        //     const save = true;
        //     const update = false;
        //     const payload = this.createDialogPayload(save, update);
        //     this.dialogRef.close(payload);
        // } else if (!isEmpty) {
        //     const save = false;
        //     const update = true;
        //     const payload = this.createDialogPayload(save, update);
        //     this.dialogRef.close(payload);
        // }
    };
}
