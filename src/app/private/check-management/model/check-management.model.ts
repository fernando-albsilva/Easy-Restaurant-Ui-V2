import { ProductModel } from '../../product/Model/product.model';

export class TableModel {
    public number: number = 0;
    public clientName: string = '';
    public invoiceId: string = '';
    public date: Date = new Date();
    public worker: WorkerTinyModel = new WorkerTinyModel();
    public shouldHideByFilter: boolean = false;
    public products: Array<ProductModel> = [];

    constructor(number?: number) {
        if (number) {
            this.number = number;
        }
    }
}

export class IndividualCheckModel {
    public number: number = 0;
    public clientName: string = '';
    public invoiceId: string = '';
    public date: Date = new Date();
    public worker: WorkerTinyModel = new WorkerTinyModel();
    public products: Array<ProductModel> = [];
}

export class WorkerTinyModel {
    public id: string = '';
    public name: string = '';
}

export class ActiveProductModel {
    public id: string = '';
    public name: string = '';
    public unitValue: number = 0;
    public cost: number = 0;
    public quantity: number = 0;
}
