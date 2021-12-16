import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UUID } from 'angular2-uuid';

import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { ObjectService } from 'src/app/services/object.service';
import { ProductModel } from '../Model/product.model';

@Component({
    selector: 'create-product-dialog',
    templateUrl: 'create-product-dialog.component.html',
    styleUrls: ['create-product-dialog.component.scss'],
})
export class CreateProductDialog implements OnInit {
    public product: ProductModel = new ProductModel();
    public isNew: boolean = true;

    constructor(
        private objectService: ObjectService,
        public messages: MessagesKeys,
        public dialogRef: MatDialogRef<CreateProductDialog>,
        @Inject(MAT_DIALOG_DATA) public data: ProductModel,
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.isNew = false;
            this.product = this.data;
        } else {
            this.product.id = UUID.UUID();
        }
    }

    public onCancel = (): void => {
        this.dialogRef.close();
    };

    public onSave = (): void => {
        const isEmpty = this.verifyIfInputValueIsEmpty();
        if (this.isNew && !isEmpty) {
            this.dialogRef.close({ data: this.product, type: 'save' });
        } else if (!isEmpty) {
            this.dialogRef.close({ data: this.product, type: 'update' });
        }
    };

    private verifyIfInputValueIsEmpty = () => {
        return this.objectService.isAnyPropertyEmpty(this.product);
    };
}
