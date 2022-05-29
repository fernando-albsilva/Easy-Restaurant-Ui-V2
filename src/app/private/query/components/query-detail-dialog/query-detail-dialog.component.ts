import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { InvoiceItemModel, InvoiceModel } from '../../model/invoice.model';

@Component({
    selector: 'app-query-detail-dialog',
    templateUrl: './query-detail-dialog.component.html',
    styleUrls: ['./query-detail-dialog.component.scss'],
})
export class QueryDetailDialogComponent implements OnInit {
    public totalValue: number = 0;
    public invoiceItems: Array<InvoiceItemModel> = [];
    public displayedColumns: string[] = ['productName', 'quantity', 'unitValue', 'cost', 'total'];

    constructor(
        public translateKey: MessagesKeys,
        public dialogRef: MatDialogRef<QueryDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: InvoiceModel,
    ) {}

    ngOnInit(): void {
        this.calcTotalValue();
        if (this.data.invoiceItems) {
            this.invoiceItems = this.data.invoiceItems;
        }
    }

    public getTenPerCentOfTotalValue = (): string => {
        return (this.totalValue * 0.1).toFixed(2);
    };

    public getTotalValueWithTenPerCent = (): string => {
        return (this.totalValue * 1.1).toFixed(2).toString();
    };

    public getInvoiceBalance = (): string => {
        return (this.totalValue * 1.1 - Number(this.getInvoiceExpense())).toFixed(2).toString();
    };

    public getInvoiceExpense = (): string => {
        let totalExpense = 0;

        this.data.invoiceItems.forEach((product: InvoiceItemModel) => {
            totalExpense += product.quantity * product.cost;
        });

        return totalExpense.toFixed(2).toString();
    };

    private calcTotalValue = (): void => {
        let total = 0;

        this.data.invoiceItems.forEach((product: InvoiceItemModel) => {
            total += product.unitValue * product.quantity;
        });

        this.totalValue = total;
    };
}
