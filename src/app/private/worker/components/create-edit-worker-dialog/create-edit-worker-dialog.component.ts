import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UUID } from 'angular2-uuid';

import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { ObjectService } from 'src/app/services/object.service';
import { WorkerModel } from '../../Model/woker.model';

import { FunctionApi } from 'src/app/private/worker-function/api/function.api';
import { FunctionModel } from 'src/app/private/worker-function/Model/function.model';
import { SortService } from 'src/app/services/sort.service';

@Component({
    selector: 'create-edit-worker-dialog',
    templateUrl: 'create-edit-worker-dialog.component.html',
    styleUrls: ['create-edit-worker-dialog.component.scss'],
})
export class CreateEditWorkerDialog implements OnInit {
    public worker: WorkerModel = new WorkerModel();
    public workerFunctions: Array<FunctionModel> = [];
    public isNew: boolean = true;

    constructor(
        private _erMessagesSnackbar: ErMessages,
        private _objectService: ObjectService,
        private _workerFunctionApi: FunctionApi,
        private _sortService: SortService,
        public messages: MessagesKeys,
        public dialogRef: MatDialogRef<CreateEditWorkerDialog>,
        @Inject(MAT_DIALOG_DATA) public data: WorkerModel,
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.isNew = false;
            this.worker = this.data;
        } else {
            this.worker.id = UUID.UUID();
        }

        this.fillFunctionsAvailables();
    }

    public onCancel = (): void => {
        this.dialogRef.close();
    };

    public onSave = (): void => {
        const isEmpty = this.verifyIfInputValueIsEmpty();
        if (isEmpty) {
            this._erMessagesSnackbar.openSnackBar(this.messages.successfullyDeleted, 'warning');
        } else if (this.isNew) {
            this.dialogRef.close({ data: this.worker, type: 'save' });
        } else {
            this.dialogRef.close({ data: this.worker, type: 'update' });
        }
    };

    private verifyIfInputValueIsEmpty = () => {
        return this._objectService.isAnyPropertyEmpty(this.worker);
    };

    public fillFunctionsAvailables = (): void => {
        this._workerFunctionApi.getFunctions().subscribe(
            (requestResult) => {
                this.workerFunctions = this._sortService.sortListByObjectPropertyCaseInsensitive(requestResult, 'type');
            },
            (error) => {
                console.log(error);
            },
        );
    };
}
