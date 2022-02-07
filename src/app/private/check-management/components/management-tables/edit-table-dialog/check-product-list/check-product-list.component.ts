import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from 'src/app/private/product/Model/product.model';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
    selector: 'check-product-list',
    templateUrl: './check-product-list.component.html',
    styleUrls: ['./check-product-list.component.scss'],
})
export class CheckProductList {
    @Input() products: Array<ProductModel> = [];
    @Output() removeProduct = new EventEmitter<any>();

    public openDialog: boolean = false;

    constructor(public messages: MessagesKeys) {}

    public calcTotalValue = (product: ProductModel): string => {
        return (product.quantity * product.unitValue).toString();
    };

    public removeProductFromCheck = (idInTableCheck: string): void => {
        this.openDialog = true;
        //FIXME aqui vai mandar para o pai passando um comando se vai excluir ou nao dependendo de como 
        // o usuario decidiu cancelar
        // this.removeProduct.emit(idInTableCheck);
    };
}
