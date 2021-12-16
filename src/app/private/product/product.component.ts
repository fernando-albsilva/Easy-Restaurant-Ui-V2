import { DialogService } from '../../services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { SortService } from 'src/app/services/sort.service';
import { ProductApi } from './api/product.api';
import { ProductModel } from './Model/product.model';
import { ProductCommand } from './commands/product.comand';
import { CreateProductDialog } from './create-product-dialog/create-product-dialog.component';

@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    public erPageListContext: string = 'product';
    public erPageListOperationsPermited: Array<string> = ['add', 'edit', 'delete'];

    public products: Array<ProductModel> = [];

    private _byTypeProperty: string = 'name';

    constructor(
        private productApi: ProductApi,
        public dialog: MatDialog,
        private erMessagesSnackbar: ErMessages,
        private messages: MessagesKeys,
        private sortService: SortService,
        private dialogService: DialogService,
    ) {}

    ngOnInit(): void {
        this.productApi.getProducts().subscribe((requestResult) => {
            this.products = this.sortService.sortListByObjectPropertyCaseInsensitive(
                requestResult,
                this._byTypeProperty,
            );
        });
    }

    public addProduct = () => {
        const dialogRef = this.createDialog();

        dialogRef.afterClosed().subscribe((response: any) => {
            const canSave = response && response.type === 'save';
            if (canSave) {
                this.handleProductCreation(response.data);
            }
        });
    };

    public deleteProduct = (selectedItems: any) => {
        this.handleProductDelete(selectedItems);
    };

    public updateProduct = (selectedItem: any) => {
        const dialogData = selectedItem;
        const dialogRef = this.createDialog(dialogData);

        dialogRef.afterClosed().subscribe((response: any) => {
            const canUpdate = response && response.type === 'update';
            if (canUpdate) {
                this.handleProductUpdate(response.data);
            }
        });
    };

    private createDialog = (dialogData?: ProductModel) => {
        const height = '500px';
        const width = '500px';

        if (dialogData) {
            const dialogRef = this.dialogService.createDialog(CreateProductDialog, height, width, dialogData);
            return dialogRef;
        } else {
            const dialogRef = this.dialogService.createDialog(CreateProductDialog, height, width);
            return dialogRef;
        }
    };

    private handleProductCreation = (productCommand: ProductCommand) => {
        this.productApi.createProduct(productCommand).subscribe(
            (result) => {
                this.getProducts();
                this.erMessagesSnackbar.openSnackBar(this.messages.successfullyCreated, 'sucess');
            },
            (erro) => {
                console.log(erro);
            },
        );
    };

    private handleProductUpdate = (productCommand: ProductCommand) => {
        this.productApi.updateProduct(productCommand).subscribe(
            (result) => {
                this.getProducts();
                this.erMessagesSnackbar.openSnackBar(this.messages.successfullyUpdated, 'sucess');
            },
            (erro) => {
                console.log(erro);
            },
        );
    };
    private handleProductDelete = (productsIds: Array<string>) => {
        this.productApi.deleteProductsByIds(productsIds).subscribe(
            (result) => {
                this.getProducts();
                this.erMessagesSnackbar.openSnackBar(this.messages.successfullyDeleted, 'sucess');
            },
            (erro) => {
                console.log(erro);
            },
        );
    };

    public getProducts = () => {
        this.productApi.getProducts().subscribe((response: Array<ProductModel>) => {
            this.products = this.sortService.sortListByObjectPropertyCaseInsensitive(response, this._byTypeProperty);
        });
    };
}
