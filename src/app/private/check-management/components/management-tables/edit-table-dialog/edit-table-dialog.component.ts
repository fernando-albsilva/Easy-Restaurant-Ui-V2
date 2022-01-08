import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FunctionApi } from 'src/app/private/worker-function/api/function.api';
import { WorkerApi } from 'src/app/private/worker/api/worker.api';
import { WorkerFlatModel, WorkerModel } from 'src/app/private/worker/Model/woker.model';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { ObjectService } from 'src/app/services/object.service';
import { SortService } from 'src/app/services/sort.service';
import { CheckManagementApi } from '../../../api/check-management.api';
import { TableModel } from '../../../model/check-management.model';

@Component({
    selector: 'edit-table-dialog',
    templateUrl: './edit-table-dialog.component.html',
    styleUrls: ['./edit-table-dialog.component.scss'],
})
export class EditTableDialog implements OnInit {
    public table: TableModel = new TableModel();
    public worker: WorkerModel = new WorkerModel();
    public workers: Array<WorkerFlatModel> = [];
    public isNew: boolean = true;

    public myControl = new FormControl();
    public filteredOptions: Observable<WorkerFlatModel[]> | undefined;

    constructor(
        private _erMessagesSnackbar: ErMessages,
        private _objectService: ObjectService,
        private _checkManagementApi: CheckManagementApi,
        private _sortService: SortService,
        public messages: MessagesKeys,
        public dialogRef: MatDialogRef<EditTableDialog>,
        @Inject(MAT_DIALOG_DATA) public data: TableModel,
    ) {}

    ngOnInit(): void {
        console.log(this.data);
        this.table = this.data;

        this.getWorkesThatHaveWaiterFunction();
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

    public handleValueChosen(workerChosen: WorkerFlatModel) {
        console.log('recebi ');
        console.log(workerChosen);
    }

    private getWorkesThatHaveWaiterFunction = (): void => {
        this._checkManagementApi.getWorkers().subscribe(
            (requestResult) => {
                // console.log(requestResult);
                this.workers = requestResult;
                //  this.workerFunctions = this._sortService.sortListByObjectPropertyCaseInsensitive(requestResult, 'type');
            },
            (error) => {
                console.log(error);
            },
        );
    };

    public handleWorkerChange = (workerChosen: WorkerFlatModel) => {
        this.table.worker = workerChosen;
        console.log(this.table);
    };

    private verifyIfInputValueIsEmpty = () => {
        return this._objectService.isAnyPropertyEmpty(this.worker);
    };
}
