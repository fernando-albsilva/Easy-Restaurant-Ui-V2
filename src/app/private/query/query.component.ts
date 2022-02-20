import { Component, OnInit } from '@angular/core';
import { QueryApi } from './api/query.api';
import { InvoiceFlatModel } from './model/invoice.model';

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
    private queryApi: QueryApi
  ) { }

  ngOnInit(): void {
    this.queryApi
      .getWorkers()
      .subscribe(
        (result) => {this.invoices = result},
        (err) => { console.error(err);}
      );
  }

  //BMFERNANDO
  // aqui ira abrir o dialogo detalhando a conta
  public detailSelectedInvoice = (): void => {
    console.log("cliquei em detalhar");
  }

}
