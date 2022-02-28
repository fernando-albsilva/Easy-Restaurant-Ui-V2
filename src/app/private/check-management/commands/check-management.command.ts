import { UUID } from "angular2-uuid";
import { ProductModel } from "../../product/Model/product.model";
import { UserCommand } from "../../user/commands/auth-user.command";
import { WorkerCommand } from "../../worker/commands/worker.comand";
import { TableModel, TableStartTime } from "../model/check-management.model";

export class InvoiceActiveCommand {
    public id: string = '';
    public user: UserCommand = new UserCommand();
    public worker: WorkerCommand = new WorkerCommand();
    public date: Date = new Date();
    public clientName: string = '';
    public tableNumber: number | undefined;
    public individualCheckNumber: number | undefined;
    public startTime: string = '';
    public activeInvoiceItems: Array<ActiveInvoiceItem> = [];

    constructor(table: TableModel, isIndividualCheck?: boolean) {
        this.id = UUID.UUID();
        this.user.id = table.userId;
        this.worker.id = table.worker.id;
        this.date = table.date;
        this.clientName = table.clientName;
        if(isIndividualCheck){
            this.individualCheckNumber = table.number;
        }else{
            this.tableNumber = table.number;
        }
        this.startTime = this.handleStartTime(table.startTime);
        this.parseProducstInInvoiceItems(table.products);
    }

    private handleStartTime = (startTime:TableStartTime):string => {
        return `${startTime.hour}:${startTime.min}:${startTime.sec}`
    }

    private  parseProducstInInvoiceItems = (products:Array<ProductModel>): void => {
        products.forEach(
            (product) => {
                const activeInvoiceItem = new ActiveInvoiceItem(product,this.id)
                this.activeInvoiceItems.push(activeInvoiceItem);
            }
        )
    }
}

export class ActiveInvoiceItem {
    public id: string = '';
    public product: ProductModel = new ProductModel();
    public quantity: number = 0;
    public activeInvoiceId: string = '';

    constructor(product:ProductModel, activeInvoiceId:string){
        this.id = product.idInTableCheck;
        this.product.id = product.id;
        this.quantity = product.quantity;
        if(activeInvoiceId){
            this.activeInvoiceId = activeInvoiceId;
        }
    }

}