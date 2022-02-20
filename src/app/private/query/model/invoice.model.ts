
export class InvoiceModel {

}

export class InvoiceFlatModel {
    
    public clientName: string = '';
    public workerName: string = '';
    public date: Date = new Date();
    public duration: string = '';
    public totalValue: number = 0;

    constructor(){}
}