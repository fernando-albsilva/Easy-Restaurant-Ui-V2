import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';

import { ProductModel } from '../Model/product.model';
import { ProductCommand } from '../commands/product.comand';

@Injectable()
export class ProductApi {
    public apiUrl = `https://localhost:5101/Products`;

    constructor(private http: HttpClient) {}

    public getProducts(): Observable<Array<ProductModel>> {
        return this.http.get(this.apiUrl + '/GetAll').pipe(map((element) => element as Array<ProductModel>));
    }

    public createProduct = (cmd: ProductCommand): Observable<any> => {
        cmd.id = UUID.UUID();
        return this.http.post(`${this.apiUrl}/Create`, cmd);
    };

    public updateProduct = (cmd: ProductCommand): Observable<any> => {
        return this.http.put<any>(`${this.apiUrl}/Update`, cmd);
    };

    public deleteProduct = (id: string): Observable<any> => {
        let params = new HttpParams();
        params = params.append('Id', id);

        return this.http.delete<any>(`${this.apiUrl}/Delete`, { params: params });
    };

    public deleteProductsByIds = (idList: Array<string>): Observable<any> => {
        return this.http.post<any>(`${this.apiUrl}/DeleteByList`, idList);
    };
}
