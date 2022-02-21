import { ProductModel } from "../../product/Model/product.model";

export class InvoiceFlatModel {
    
    public clientName: string = '';
    public workerName: string = '';
    public date: Date = new Date();
    public duration: string = '';
    public totalValue: number = 0;

    constructor(){}
}

export class InvoiceModel { 
    public id: string = '';
    public user: UserInvoiceModel = new UserInvoiceModel();
    public worker: WorkerInvoiceModel = new WorkerInvoiceModel();
    public date: string = '';
    public clientName: string = '';
    public duration: string = '';
    public invoiceItems: Array<InvoiceItemModel> = [];
}

export class InvoiceItemModel {
    id: string = '';
    product: ProductModel = new ProductModel();
    quantity: number = 0;
    unitValue: number = 0;
    Cost: number = 0;
}

export class WorkerInvoiceModel {
    public id: string = '';
    public name: string = '';
}

export class UserInvoiceModel {
    public id: string = '';
    public name: string = '';
}