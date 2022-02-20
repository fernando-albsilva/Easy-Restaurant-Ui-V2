import { Component, Input, OnInit } from '@angular/core';
import { InvoiceFlatModel } from 'src/app/private/query/model/invoice.model';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
  selector: 'invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.scss', '../styles/shared-card-style.scss']
})
export class InvoiceCardComponent {
  @Input() set item(invoiceFlatModel: InvoiceFlatModel) {
      this.invoiceFlatModel = invoiceFlatModel;
  }

  @Input() selected = false;

  public invoiceFlatModel: InvoiceFlatModel = new InvoiceFlatModel();

  constructor(public messages: MessagesKeys) {}

}
