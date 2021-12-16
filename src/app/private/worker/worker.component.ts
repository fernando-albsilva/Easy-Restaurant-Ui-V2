import { Component, OnInit } from '@angular/core';

import { DialogService } from './../../services/dialog.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { SortService } from 'src/app/services/sort.service';
import { ErMessages } from 'src/app/services/er-messages.service';

import { WorkerApi } from './api/worker.api';
import { CreateEditWorkerDialog } from './components/create-edit-worker-dialog/create-edit-worker-dialog.component';
import { WorkerFlatModel, WorkerModel } from './Model/woker.model';
import { WorkerCommand } from './commands/worker.comand';

@Component({
    selector: 'worker',
    templateUrl: './worker.component.html',
    styleUrls: ['./worker.component.scss'],
})
export class WorkerComponent implements OnInit {
    public erPageListContext: string = 'worker';
    public erPageListOperationsPermited: Array<string> = ['add', 'edit', 'delete'];
    public workers: Array<WorkerFlatModel> = [];

    private byTypeName: string = 'name';

    constructor(
        private workerApi: WorkerApi,
        private erMessagesSnackbar: ErMessages,
        private messages: MessagesKeys,
        private sortService: SortService,
        private dialogService: DialogService,
    ) {}

    ngOnInit(): void {
        this.workerApi.getWorkers().subscribe((requestResult) => {
            this.workers = this.sortService.sortListByObjectPropertyCaseInsensitive(requestResult, this.byTypeName);
        });
    }

    public addWorker = () => {
        const dialogRef = this.createDialog();

        dialogRef.afterClosed().subscribe((response: any) => {
            const canSave = response && response.type === 'save';
            if (canSave) {
                this.handleFunctionCreation(response.data);
            }
        });
    };

    public deleteWorker = (selectedItems: any) => {
        this.handleFunctionDelete(selectedItems);
    };

    public updateWorker = (selectedItem: any) => {
        this.workerApi.getWorker(selectedItem.id).subscribe(
            (requestResult) => {
                const dialogData = requestResult;
                const dialogRef = this.createDialog(dialogData);

                dialogRef.afterClosed().subscribe((response: any) => {
                    const canUpdate = response && response.type === 'update';
                    if (canUpdate) {
                        this.handleFunctionUpdate(response.data);
                    }
                });
            },
            (error) => {
                console.log(error);
            },
        );
    };

    private createDialog = (dialogData?: WorkerModel) => {
        const height = '680px';
        const width = '600px';

        if (dialogData) {
            const dialogRef = this.dialogService.createDialog(CreateEditWorkerDialog, height, width, dialogData);
            return dialogRef;
        } else {
            const dialogRef = this.dialogService.createDialog(CreateEditWorkerDialog, height, width);
            return dialogRef;
        }
    };

    private handleFunctionCreation = (workerCommand: WorkerCommand) => {
        this.workerApi.createWorker(workerCommand).subscribe(
            (result) => {
                this.getWorkers();
                this.erMessagesSnackbar.openSnackBar(this.messages.successfullyCreated, 'sucess');
            },
            (error) => {
                console.log(error);
            },
        );
    };

    private handleFunctionUpdate = (workerCommand: WorkerCommand) => {
        this.workerApi.updateWorker(workerCommand).subscribe(
            (result) => {
                this.getWorkers();
                this.erMessagesSnackbar.openSnackBar(this.messages.successfullyUpdated, 'sucess');
            },
            (error) => {
                console.log(error);
            },
        );
    };
    private handleFunctionDelete = (workesIds: Array<string>) => {
        this.workerApi.deleteMultiplesWorkers(workesIds).subscribe(
            (result) => {
                this.getWorkers();
                this.erMessagesSnackbar.openSnackBar(this.messages.successfullyDeleted, 'sucess');
            },
            (error) => {
                console.log(error);
            },
        );
    };

    public getWorkers = () => {
        this.workerApi.getWorkers().subscribe((response: Array<WorkerFlatModel>) => {
            this.workers = this.sortService.sortListByObjectPropertyCaseInsensitive(response, this.byTypeName);
        });
    };
}
