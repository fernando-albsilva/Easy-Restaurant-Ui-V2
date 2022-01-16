import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { CheckManagementModule } from '../check-management.module';
import { WorkerFlatModel } from '../../worker/Model/woker.model';
import { ProductModel } from '../../product/Model/product.model';
import { TableModel } from '../model/check-management.model';
import { InvoiceActiveCommand } from '../commands/check-management.command';

@Injectable({
    providedIn: 'any',
})
export class CheckManagementApi {
    public apiUrl = `https://localhost:5101/CheckManagement`;

    constructor(private http: HttpClient) {}

    public getWorkers(): Observable<Array<WorkerFlatModel>> {
        return this.http.get(this.apiUrl + '/Workers').pipe(map((element) => element as Array<WorkerFlatModel>));
    }
   
    public getProducts(): Observable<Array<ProductModel>> {
        return this.http.get(this.apiUrl + '/Products').pipe(map((element) => element as Array<ProductModel>));
    }

    public createActiveTable = (invoiceActiveCommand: InvoiceActiveCommand): Observable<any> => {
        // let params = new HttpParams();
        // params = params.append('table', table);

        // return this.http.post<any>(`${this.apiUrl}/crateActiveTable`, { params: params });
        return this.http.post<any>(`${this.apiUrl}/crateActiveTable`, invoiceActiveCommand);
    };
}
