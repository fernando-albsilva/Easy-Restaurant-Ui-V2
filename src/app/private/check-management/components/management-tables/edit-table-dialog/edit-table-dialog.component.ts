import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from 'src/app/private/product/Model/product.model';
import { WorkerFlatModel, WorkerModel } from 'src/app/private/worker/Model/woker.model';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { ObjectService } from 'src/app/services/object.service';
import { SortService } from 'src/app/services/sort.service';
import { TimeService } from 'src/app/services/time.service';
import { CheckManagementApi } from '../../../api/check-management.api';
import { CheckManagementHelper } from '../../../check-management.helper';
import { ProductInfo, TableModel, TableStartTime } from '../../../model/check-management.model';

@Component({
    selector: 'edit-table-dialog',
    templateUrl: './edit-table-dialog.component.html',
    styleUrls: ['./edit-table-dialog.component.scss'],
})
export class EditTableDialog implements OnInit, OnDestroy {
    public table: TableModel = new TableModel();
    public worker: WorkerModel = new WorkerModel();
    public workers: Array<WorkerFlatModel> = [];
    public products: Array<ProductModel> = [];
    public selectedProduct: ProductModel = new ProductModel();
    public productSelectionInfo: ProductInfo = new ProductInfo();
    public isNew: boolean = true;
    public timeCountingRef: any;
    public durationTime: string = '00:00:00';

    //helper
    private _managementHelper = new CheckManagementHelper();

    constructor(
        private _erMessagesSnackbar: ErMessages,
        private _objectService: ObjectService,
        private _checkManagementApi: CheckManagementApi,
        private _sortService: SortService,
        private _timeService: TimeService,
        public messages: MessagesKeys,
        public dialogRef: MatDialogRef<EditTableDialog>,
        @Inject(MAT_DIALOG_DATA) public data: TableModel,
    ) {}

    ngOnInit(): void {
        console.log(this.data);
        this.table = this.data;

        this.getWorkesThatHaveWaiterFunction();
        this.getAvailableProducts();
    }

    ngOnDestroy(): void {
        this._timeService.stopCounting(this.timeCountingRef);
        this._timeService.timeEmmiter.unsubscribe();
        this._timeService.startTimeEmmiter.unsubscribe();
    }

    public closeDialog = (): void => {
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

    public tableHasClientAndWorker = (): boolean => {
        return this.table.clientName !== '' && this.table.worker.id !== '';
    };

    public startTable = (): void => {
        this.table.isActive = true;

        this._timeService.startTimeEmmiter.subscribe((startTime: TableStartTime) => {
            this.table.startTime = startTime;
        });

        this._timeService.timeEmmiter.subscribe((durationTimeReceived: string) => {
            this.durationTime = durationTimeReceived;
        });

        this.timeCountingRef = this._timeService.start(this.table.startTime);
    };

    public getParseTableStartTime = (): string => {
        return this._timeService.parseTableStartTime(this.table.startTime);
    };

    public handleWorkerChange = (workerChosen: WorkerFlatModel | undefined) => {
        if (!workerChosen) {
            this.table.worker = new WorkerFlatModel();
        } else {
            this.table.worker = workerChosen;
        }
    };

    public handleProductChosen = (product: ProductModel): void => {
        this.selectedProduct = product;
        this.selectedProduct.quantity = 0;
        if(this.isProductAndQuantityChosen()){
            this.productSelectionInfo = this._managementHelper.generateProductinfo(product)
        }
    };

    public handleQuantityChange = (): void => {
        if(this.isProductAndQuantityChosen()){
            this.productSelectionInfo = this._managementHelper.generateProductinfo(this.selectedProduct);
        }
    }

    public isProductAndQuantityChosen = (): boolean => {
        return this.selectedProduct.id !== '' && this.selectedProduct.quantity > 0;
    };

    //TODO tratar a inclusao do produto
    // revisar como esta aparecendo na tela formato da moeda real nas informacoes
    public includeProduct = () =>{

    }

    private getWorkesThatHaveWaiterFunction = (): void => {
        this._checkManagementApi.getWorkers().subscribe(
            (requestResult: Array<WorkerFlatModel>) => {
                this.workers = this._sortService.sortByProperty(requestResult, 'name');
            },
            (error) => {
                console.log(error);
            },
        );
    };

    private getAvailableProducts = (): void => {
        this._checkManagementApi.getProducts().subscribe(
            (requestResult: Array<ProductModel>) => {
                this.products = requestResult;
            },
            (error) => {
                console.log(error);
            },
        );
    };

    private verifyIfInputValueIsEmpty = () => {
        return this._objectService.isAnyPropertyEmpty(this.worker);
    };
}
