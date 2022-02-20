import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceFlatModel } from '../model/invoice.model';

@Injectable()
export class QueryApi {

  public apiUrl = `https://localhost:5101/CheckManagement`;

  constructor(private http: HttpClient) {}

  public getWorkers(): Observable<Array<InvoiceFlatModel>> {
    return this.http.get(this.apiUrl + '/GetAllInvoice')
      .pipe(
        map((element) => element as Array<InvoiceFlatModel>)
      );
}
}
