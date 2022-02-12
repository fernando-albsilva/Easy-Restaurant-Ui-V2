import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UUID } from 'angular2-uuid';
import { Subscription } from 'rxjs';
import { ProductModel } from 'src/app/private/product/Model/product.model';
import { WorkerFlatModel, WorkerModel } from 'src/app/private/worker/Model/woker.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { ObjectService } from 'src/app/services/object.service';
import { SortService } from 'src/app/services/sort.service';
import { TimeService } from 'src/app/services/time.service';
import { CheckManagementApi } from '../../../api/check-management.api';
import { CheckManagementHelper } from '../../../check-management.helper';
import { ActiveInvoiceItem, InvoiceActiveCommand } from '../../../commands/check-management.command';
import { CheckOptions, CheckResult, ProductInfo, ProductRemovePayload, TableModel, TableStartTime } from '../../../model/check-management.model';

@Component({
    selector: 'edit-table-dialog',
    templateUrl: './edit-table-dialog.component.html',
    styleUrls: ['./edit-table-dialog.component.scss'],
})
export class EditTableDialog implements OnInit, OnDestroy {
    public table: TableModel = new TableModel();
    public worker: WorkerFlatModel = new WorkerFlatModel();
    public workers: Array<WorkerFlatModel> = [];
    public products: Array<ProductModel> = [];
    public selectedProduct: ProductModel = new ProductModel();
    public productSelectionInfo: ProductInfo = new ProductInfo();
    public isNew: boolean = true;
    public timeCountingRef: any;
    public durationTime: string = '00:00:00';

    //helper
    private _managementHelper = new CheckManagementHelper();
    private _timeEmitterSubscribe: Subscription = new Subscription();
    private _startTimeSubscribe: Subscription = new Subscription();

    constructor(
        private _erMessagesSnackbar: ErMessages,
        private _authService: AuthService,
        private _objectService: ObjectService,
        private _checkManagementApi: CheckManagementApi,
        private _sortService: SortService,
        private _timeService: TimeService,
        public messages: MessagesKeys,
        public dialogRef: MatDialogRef<EditTableDialog>,
        @Inject(MAT_DIALOG_DATA) public data: TableModel,
    ) {
        dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        
        this.table = this.data;
        if(!this.table.isActive){
            this.getWorkesThatHaveWaiterFunction();
        }else{
            //TODO verificar por que o er-autocomplete precisa
            //do input value quando uma mesa ja esta ativa
            this.worker=this.table.worker
            this.startTableCounting();
        }
        this.getAvailableProducts();


    }

    ngOnDestroy(): void {
        this._timeService.stopCounting(this.timeCountingRef);
        this._timeEmitterSubscribe.unsubscribe();
        if(!this.table.isActive){
            this._startTimeSubscribe.unsubscribe();
        }
    }

    public closeDialog = (): void => {
        const checkOptions = this.createCheckOptions('active');
        const checkResult = new CheckResult(this.table,checkOptions)
        this.dialogRef.close(checkResult);
    };

    public tableHasClientAndWorker = (): boolean => {
        return this.table.clientName !== '' && this.table.worker.id !== '';
    };

    public startTable = (): void => {
        this.table.isActive = true;
        this.startTableCounting();
        this.fillNecessaryTableFields();
        const invoiceActivecommand =  new InvoiceActiveCommand(this.table);
        this.table.invoiceId = invoiceActivecommand.id;
        this._checkManagementApi
            .createActiveTable(
                invoiceActivecommand
            )
            .subscribe(
                ()=>{},
                (err) => {
                    console.log(err);
                }
            );
    };

    public getParseTableStartTime = (): string => {
        return this._timeService.parseTableStartTime(this.table.startTime);
    };

    public getCheckValue = (): string => {
        const total = this._managementHelper.getTableCheckValue(this.table.products,2);
        return `R$${total}`;
    }
   
    public getTenPercentOfCheckValue = (): string => {
        const tenPercentOfCheck = this._managementHelper.getTenPercentOfCheckValue(this.table.products,2);
        return `R$${tenPercentOfCheck}`;
    }
    
    public getCheckValueWithTenPercent = (): string => {
        const totalWihtTenPercent = this._managementHelper.getTableCheckValueWithTenPerCent(this.table.products,2);
        return `R$${totalWihtTenPercent}`;
    }

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
        if (this.isProductAndQuantityChosen()) {
            this.productSelectionInfo = this._managementHelper.generateProductinfo(product);
        }
    };

    public handleQuantityChange = (): void => {
        if (this.isProductAndQuantityChosen()) {
            this.productSelectionInfo = this._managementHelper.generateProductinfo(this.selectedProduct);
        }
    };

    public isProductAndQuantityChosen = (): boolean => {
        return this.selectedProduct.id !== '' && this.selectedProduct.quantity > 0;
    };

    //FIXME revisar como esta aparecendo na tela formato da moeda real nas informacoes
    public includeProduct = (): void => {
        if (this.isProductAndQuantityChosen()) {
          const product = this.createProductToPushInTableList();
          this.table.products.push(product);

          //TODO continuar daqui
          // deve mandar atualizar no banco o active invoice items com os produtos
          this._checkManagementApi
          .IncludeProductInActiveTable(
              new ActiveInvoiceItem(product,this.table.invoiceId)
          )
          .subscribe(
              ()=>{},
              (err) => {
                  console.log(err);
              }
          );


        }
    };

    public handleRemovedProduct = (productAction: ProductRemovePayload): void => {
        const canRemoveProduct = 
           productAction.removeAction &&
           this.productExistInCheck(productAction.productId);

        if (canRemoveProduct && productAction.productId) {
            this.removeProductFromTableCheck(productAction.productId);
        } else {
            throw new Error('Product does not exist in table products list');
        }
    };

    public handleCloseCheck = () => {
        const checkOptions = this.createCheckOptions('closed');
        const checkResult = new CheckResult(this.table,checkOptions)
        this.dialogRef.close(checkResult);
    };

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

    private removeProductFromTableCheck = (productIdInTableCheck: string): void => {
        this.table.products = this.table.products.filter((product) => {
            return !(product.idInTableCheck === productIdInTableCheck);
        });
        //TODO
        //Enviar o id do produto a ser excluido da conta par ao back end
        //
        this._checkManagementApi
            .removeProduct(productIdInTableCheck)
            .subscribe(
                ()=>{},
                (err)=> {
                    console.error(err);
                }
            );
    };

    private productExistInCheck = (idInTableCheck: string | undefined): boolean => {
        const exist = this.table.products.find((product) => {
            return idInTableCheck == product.idInTableCheck;
        });

        return exist ? true : false;
    };

    private createCheckOptions = (option: string): CheckOptions => {
        let checkOptions = new CheckOptions();

        if (option === 'closed') {
            checkOptions = {
                closed: true,
                active: false,
            }
            return checkOptions;
        } else if (option === 'active') {
            checkOptions = {
                closed: false,
                active: true,
            };
            return checkOptions;
        } else {
            throw new Error('Incorrect option in createCheckOptions()');
        }
    };
  
    private createProductToPushInTableList = (): ProductModel => {
        let product = new ProductModel();

        product = {
            idInTableCheck: UUID.UUID(),
            id: this.selectedProduct.id,
            name: this.selectedProduct.name,
            unitValue: this.selectedProduct.unitValue,
            cost: this.selectedProduct.cost,
            code: this.selectedProduct.code,
            quantity: this.selectedProduct.quantity,
        };

        return product;
    };

    private startTableCounting = (): void => {
        if(!this.table.isActive){
            this._startTimeSubscribe = this._timeService.startTimeEmmiter.subscribe((startTime: TableStartTime) => {
                this.table.startTime = startTime;
            });
        }

        this._timeEmitterSubscribe = this._timeService.timeEmmiter.subscribe((durationTimeReceived: string) => {
            this.durationTime = durationTimeReceived;
        });

        this.timeCountingRef = this._timeService.start(this.table.startTime);
    }

    private fillNecessaryTableFields = (): void => {
        const userId = this._authService.getUserId();
        if(userId){
            this.table.userId = userId;
        }else{
            console.error(`table is not adding user on start`);
        }
    }

}
