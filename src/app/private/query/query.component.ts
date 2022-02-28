import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { QueryApi } from './api/query.api';
import { QueryDetailDialogComponent } from './components/query-detail-dialog/query-detail-dialog.component';
import { InvoiceFlatModel, InvoiceModel } from './model/invoice.model';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
  
  public readonly erPageListContext: string = 'invoice';
  public readonly erPageListOperationsPermited: Array<string> = ['detail'];

  public invoices: Array<InvoiceFlatModel> = [];

  constructor(
    private queryApi: QueryApi,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.queryApi
      .getAllInvoices()
      .subscribe(
        (result) => {this.invoices = result},
        (err) => { console.error(err);}
      );
  }

  public detailSelectedInvoice = (id: string): void => {
    console.log(id);
    this.queryApi
      .getInvoiceById(id)
      .subscribe(
        (invoiceRreceived: InvoiceModel)=> {
          this.detailInvoice(invoiceRreceived);
        },
        (err)=>{
          console.error(err);
        }
      );
  }

  public detailInvoice = (invoiceToDetail: InvoiceModel) => {
    this.createDialog(invoiceToDetail);
  };

  private createDialog = (dialogData?: InvoiceModel) => {
    const height = '700px';
    const width = '1000px';

    if (dialogData) {
        const dialogRef = 
          this.dialogService
            .createDialog(QueryDetailDialogComponent,height,width,dialogData);

        return dialogRef;
    } else {

        const dialogRef = 
        this.dialogService
          .createDialog(QueryDetailDialogComponent, height, width, dialogData);
        return dialogRef;
    }
};
}
