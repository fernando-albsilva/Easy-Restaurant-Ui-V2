import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductRemovePayload } from 'src/app/private/check-management/model/check-management.model';
import { ProductModel } from 'src/app/private/product/Model/product.model';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
    selector: 'check-product-list',
    templateUrl: './check-product-list.component.html',
    styleUrls: ['./check-product-list.component.scss'],
})
export class CheckProductList {
    @Input() products: Array<ProductModel> = [];
    @Output() removeProduct = new EventEmitter<ProductRemovePayload>();

    public openDialog: boolean = false;
    public producToRemoveId: string = '';

    constructor(
        public messages: MessagesKeys,
        private erMessagesSnackbar: ErMessages
    ) {}

    public calcTotalValue = (product: ProductModel): string => {
        return (product.quantity * product.unitValue).toString();
    };

    public removeProductFromCheck = (idInTableCheck: string): void => {
        this.producToRemoveId = idInTableCheck;
        this.openDialog = true;
    };

    public handleProductRemovingDecision = (confirm: boolean): void => {
        if(confirm){
           this.removeProduct.emit(new ProductRemovePayload(true, this.producToRemoveId));
           this.erMessagesSnackbar.openSnackBar(this.messages.successfullyDeleted, 'sucess');
        }else{
            this.erMessagesSnackbar.openSnackBar(this.messages.itemWasKept, 'warn');
        }
        this.clearRemovedProductId();
    }

    private clearRemovedProductId = (): void => {
        this.producToRemoveId = '';
    }
}
