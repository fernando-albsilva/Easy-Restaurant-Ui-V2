import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { CheckManagementModule } from '../check-management.module';
import { WorkerFlatModel } from '../../worker/Model/woker.model';
import { ProductModel } from '../../product/Model/product.model';

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

    // public getWorker(id: string): Observable<WorkerModel> {
    //     let params = new HttpParams();
    //     params = params.append('Id', id);
    //     return this.http
    //         .get(this.apiUrl + '/WorkerById', { params: params })
    //         .pipe(map((element) => element as WorkerModel));
    // }

    // public getFunctions(): Observable<Array<FunctionModel>> {
    //     return this.http.get(this.apiFunctionUrl + '/GetAll').pipe(map((element) => element as Array<FunctionModel>));
    // }

    // public createWorker = (cmd: WorkerCommand): Observable<any> => {
    //     cmd.id = UUID.UUID() + '';
    //     return this.http.post(`${this.apiUrl}/Create`, cmd);
    // };

    // public updateWorker = (cmd: WorkerCommand): Observable<any> => {
    //     return this.http.put<any>(`${this.apiUrl}/Update`, cmd);
    // };

    // public deleteWorker = (id: string): Observable<any> => {
    //     let params = new HttpParams();
    //     params = params.append('Id', id);

    //     return this.http.delete<any>(`${this.apiUrl}/Delete`, { params: params });
    // };

    // public deleteWorkersByIds = (idList: Array<string>): Observable<any> => {
    //     return this.http.post<any>(`${this.apiUrl}/DeleteByList`, idList);
    // };
}
