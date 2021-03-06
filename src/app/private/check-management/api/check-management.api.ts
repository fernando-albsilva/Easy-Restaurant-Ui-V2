import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WorkerFlatModel } from '../../worker/Model/woker.model';
import { ProductModel } from '../../product/Model/product.model';
import { ActiveInvoiceItem, InvoiceActiveCommand } from '../commands/check-management.command';
import { ActiveInvoiceModel, ActiveTable, CheckManagementSettings } from '../model/check-management.model';

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
    
    public getActiveTable(ActiveinvoiceId: string): Observable<ActiveInvoiceModel> {
        let params = new HttpParams();

        params = params.append('id', ActiveinvoiceId);

        return this.http.get(this.apiUrl + '/GetActiveInvoice', { params: params })
            .pipe(map((element) => element as ActiveInvoiceModel));
    }

    public getActiveTablesAndIndividualChecksNumber(): Observable<Array<ActiveTable>> {
        return this.http.get(this.apiUrl + '/GetActiveTablesAndIndividualChecks').pipe(map((element) => element as Array<ActiveTable>));
    }

    public createActiveTable = (invoiceActiveCommand: InvoiceActiveCommand): Observable<any> => {
        return this.http.post<any>(`${this.apiUrl}/CrateActiveTable`, invoiceActiveCommand);
    };
   
    public closeCheck = (activeInvoiceId: string, isIndividualCheck?: boolean): Observable<any> => {   
        let params = new HttpParams();
        params = params.append('activeInvoiceId', activeInvoiceId);
        if(isIndividualCheck){
            params = params.append('isIndividualCheck', 'true');
        }
        return this.http.post<any>(`${this.apiUrl}/CloseCheck`, params);
    };
   
    public updateActiveTable = (invoiceActiveCommand: InvoiceActiveCommand): Observable<any> => {
        return this.http.put<any>(`${this.apiUrl}/UpdateActiveTable`, invoiceActiveCommand);
    };

    public IncludeProductInActiveTable = (activeInvoiceItem: ActiveInvoiceItem): Observable<any> => {
        return this.http.post<any>(`${this.apiUrl}/AddItemInInvoice`, activeInvoiceItem);
    }

    public removeProduct = (id: string): Observable<any> => {
        let params = new HttpParams();
        params = params.append('id', id);

        return this.http.delete<any>(`${this.apiUrl}/RemoveActiveInvoiceItem`, { params: params });
    };

    public getCheckManagementSettings = (id: string): Observable<CheckManagementSettings> => {
        let params = new HttpParams();
        params = params.append('Id', id);
        return this.http
                    .get(this.apiUrl + `/GetCheckManagementSettings`, { params: params })
                    .pipe(
                        map((element) => element as CheckManagementSettings)
                    );
    }
}
