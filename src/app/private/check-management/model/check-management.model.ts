import { ProductModel } from '../../product/Model/product.model';
import { WorkerFlatModel } from '../../worker/Model/woker.model';

export class TableModel {
    public number: number = 0;
    public clientName: string = '';
    public invoiceId: string = '';
    public date: Date = new Date();
    public worker: WorkerFlatModel = new WorkerFlatModel();
    public shouldHideByFilter: boolean = false;
    public isActive: boolean = false;
    public products: Array<ProductModel> = [];
    public startTime: TableStartTime = new TableStartTime();
    public userId: string = '';

    constructor(number?: number) {
        if (number) {
            this.number = number;
        }
    }
}

export class TableStartTime {
    public hour: number = 0;
    public min: number = 0;
    public sec: number = 0;

    constructor(hour?: number, min?: number, sec?: number) {
        if (hour) {
            this.hour = hour;
        }

        if (min) {
            this.min = min;
        }

        if (sec) {
            this.sec = sec;
        }
    }
}

export class IndividualCheckModel {
    public number: number = 0;
    public clientName: string = '';
    public invoiceId: string = '';
    public date: Date = new Date();
    public worker: WorkerFlatModel = new WorkerFlatModel();
    public products: Array<ProductModel> = [];
}

export class ActiveProductModel {
    public id: string = '';
    public name: string = '';
    public unitValue: number = 0;
    public cost: number = 0;
    public quantity: number = 0;
}

export class ProductInfo {
    name: string = '';
    unitValue: number = 0;
    quantity: number = 0;
    total: number = 0;
    percentage: number = 0;
}

export class CheckOptions {
    public closed: boolean = false;
    public active: boolean = false;
}

export class CheckResult {
    public table: TableModel = new TableModel();
    public checkOptions: CheckOptions = new CheckOptions();

    constructor(table: TableModel, checkOptions: CheckOptions){
        this.table = table;
        this.checkOptions = checkOptions;
    }
}


export class ProductRemovePayload {
    public removeAction: boolean | undefined;
    public productId: string | undefined;

    constructor (removeAction?: boolean, productId?: string){
        if(removeAction){
            this.removeAction = removeAction;
        }
        
        if(productId){
            this.productId = productId;
        }
    }
}