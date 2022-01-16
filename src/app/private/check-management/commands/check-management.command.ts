import { UUID } from "angular2-uuid";
import { ProductModel } from "../../product/Model/product.model";
import { TableModel, TableStartTime } from "../model/check-management.model";

export class InvoiceActiveCommand {
    public id: string = '';
    public userId: string = '';
    public workerId: string = '';
    public date: Date = new Date();
    public clientName: string = '';
    public tableNumber: number = 0;
    public startTime: string = '';
    public invoiceActiveItems: Array<InvoiceActiveItemCommand> = [];

    constructor(table: TableModel) {
        this.id = UUID.UUID();
        this.userId = table.userId;
        this.workerId = table.worker.id;
        this.date = table.date;
        this.clientName = this.clientName;
        this.tableNumber = this.tableNumber;
        this.startTime = this.handleStartTime(table.startTime);
        this.parseProducstInInvoiceItems(table.products);
    }

    private handleStartTime = (startTime:TableStartTime):string => {
        return `${startTime.hour}:${startTime.min}:${startTime.sec}`
    }

    private  parseProducstInInvoiceItems = (products:Array<ProductModel>): void => {
        products.forEach(
            (product) => {
                const invoiceActiveItem = new InvoiceActiveItemCommand(product,this.id)
                this.invoiceActiveItems.push(invoiceActiveItem);
            }
        )
    }
}

export class InvoiceActiveItemCommand {
    public id: string = '';
    public invoiceActiveId: string = '';
    public productId: string = '';
    public quantity: number = 0;

    constructor(product:ProductModel, invoiceActiveId:string){
        this.id = UUID.UUID();
        this.invoiceActiveId= invoiceActiveId;
        this.productId = product.id;
        this.quantity = product.quantity;
    }

}