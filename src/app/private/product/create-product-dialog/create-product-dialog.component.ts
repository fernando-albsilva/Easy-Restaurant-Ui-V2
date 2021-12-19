import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UUID } from 'angular2-uuid';

import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { ObjectService } from 'src/app/services/object.service';
import { DialogCreateUpdatePayloadModel } from '../../shared/model/create-dialog.model';
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
            const save = true;
            const update = false;
            const payload = this.createDialogPayload(save, update);
            this.dialogRef.close(payload);
        } else if (!isEmpty) {
            const save = false;
            const update = true;
            const payload = this.createDialogPayload(save, update);
            this.dialogRef.close(payload);
        }
    };

    private verifyIfInputValueIsEmpty = (): boolean => {
        return this.objectService.isAnyPropertyEmpty(this.product);
    };

    private createDialogPayload = (save: boolean, update: boolean): DialogCreateUpdatePayloadModel => {
        return new DialogCreateUpdatePayloadModel(this.product, save, update);
    };
}
