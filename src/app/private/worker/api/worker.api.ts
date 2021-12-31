import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { FunctionModel } from '../../worker-function/Model/function.model';
import { WorkerCommand } from '../commands/worker.comand';
import { WorkerFlatModel, WorkerModel } from '../Model/woker.model';

@Injectable()
export class WorkerApi {
    public apiUrl = `https://localhost:5101/Worker`;
    public apiFunctionUrl = `https://localhost:5101/Functions`;

    constructor(private http: HttpClient) {}

    public getWorkers(): Observable<Array<WorkerFlatModel>> {
        return this.http.get(this.apiUrl + '/GetAll').pipe(map((element) => element as Array<WorkerFlatModel>));
    }

    public getWorker(id: string): Observable<WorkerModel> {
        let params = new HttpParams();
        params = params.append('Id', id);
        return this.http
            .get(this.apiUrl + '/WorkerById', { params: params })
            .pipe(map((element) => element as WorkerModel));
    }

    public getFunctions(): Observable<Array<FunctionModel>> {
        return this.http.get(this.apiFunctionUrl + '/GetAll').pipe(map((element) => element as Array<FunctionModel>));
    }

    public createWorker = (cmd: WorkerCommand): Observable<any> => {
        cmd.id = UUID.UUID() + '';
        return this.http.post(`${this.apiUrl}/Create`, cmd);
    };

    public updateWorker = (cmd: WorkerCommand): Observable<any> => {
        return this.http.put<any>(`${this.apiUrl}/Update`, cmd);
    };

    public deleteWorker = (id: string): Observable<any> => {
        let params = new HttpParams();
        params = params.append('Id', id);

        return this.http.delete<any>(`${this.apiUrl}/Delete`, { params: params });
    };

    //FIXME
    // mudar nome do metodo para deleteWorkersByIds
    public deleteMultiplesWorkers = (idList: Array<string>): Observable<any> => {
        return this.http.post<any>(`${this.apiUrl}/DeleteByList`, idList);
    };
}
