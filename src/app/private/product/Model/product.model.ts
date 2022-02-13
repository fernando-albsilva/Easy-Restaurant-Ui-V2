import { UUID } from "angular2-uuid";

export class ProductModel {
    public idInTableCheck: string = UUID.UUID();
    public id: string = '';
    public name: string = '';
    public unitValue: number = 0;
    public cost: number = 0;
    public code: number = 0;
    public quantity: number = 0;

}

export class ProductActiveInvoiceModel {
    public id: string = '';
    public name: string = '';
    public unitValue: number = 0;
    public cost: number = 0;
    public code: number = 0;
}