import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceItemModel, InvoiceModel } from '../../model/invoice.model';

@Component({
  selector: 'app-query-detail-dialog',
  templateUrl: './query-detail-dialog.component.html',
  styleUrls: ['./query-detail-dialog.component.scss']
})
export class QueryDetailDialogComponent implements OnInit {

  public totalValue: number = 0;

  constructor(
    public dialogRef: MatDialogRef<QueryDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvoiceModel,
  ) { }

  ngOnInit(): void {
    console.log("dialogo")
    console.log(this.data)
    this.calcTotalValue()
  }

  public getTenPerCentOfTotalValue = (): string => {
    return (
      (this.totalValue * 0.1)
      .toFixed(2)
    );
  }
  
  public getTotalValueWithTenPerCent = (): string => {
    return (
      (this.totalValue * 1.1)
      .toFixed(2)
      .toString()
    );
  }

  private calcTotalValue = (): void => {
    let total = 0;

    this.data.invoiceItems.forEach(
      (product: InvoiceItemModel) =>{
         total += product.unitValue * product.quantity;
      }
    );
    
    this.totalValue = total;
  }

}
