import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceFlatModel, InvoiceModel } from '../model/invoice.model';

@Injectable()
export class QueryApi {

  public apiUrl = `https://localhost:5101/CheckManagement`;

  constructor(private http: HttpClient) {}

  public getAllInvoices(): Observable<Array<InvoiceFlatModel>> {
    return this.http.get(this.apiUrl + '/GetAllInvoice')
      .pipe(
        map((element) => element as Array<InvoiceFlatModel>)
      );
  }
  
  public getInvoiceById(id: string): Observable<InvoiceModel> {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http.get(this.apiUrl + '/GetInvoiceById', { params: params })
      .pipe(
        map((element) => element as InvoiceModel)
      );
  }
}
