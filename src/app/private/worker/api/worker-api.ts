import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { WorkerFlatModel, WorkerModel } from '../Model/woker-model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import { FunctionModel } from '../../worker-function/Model/FunctionModel';

@Injectable()
export class WorkerApi {
  public apiUrl = `https://localhost:5101/Worker`;
  public apiFunctionUrl = `https://localhost:5101/Functions`;

  constructor(private http: HttpClient) {}

  public getWorkers(): Observable<Array<WorkerFlatModel>> {
    return this.http.get(this.apiUrl + '/GetAll').pipe(map(element => element as Array<WorkerFlatModel>));
  }

  public getFunctions(): Observable<Array<FunctionModel>> {
    return this.http.get(this.apiFunctionUrl + '/GetAll').pipe(map(element => element as Array<FunctionModel>));
  }

  public createWorker = (cmd: WorkerModel): Observable<any> => {
    cmd.id = UUID.UUID() + '';
    return this.http.post(`${this.apiUrl}/Create`, cmd);
  };

  public updateWorker = (cmd: WorkerModel): Observable<any> => {
    return this.http.put<any>(`${this.apiUrl}/Update`, cmd);
  };

  public deleteWorker = (id: string): Observable<any> => {
    let params = new HttpParams();
    params = params.append('Id', id);

    return this.http.delete<any>(`${this.apiUrl}/Delete`, { params: params });
  };

  public deleteMultiplesWorkers = (idList: Array<string>): Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/DeleteByList`, idList);
  };

  // public apiUrl = `https://localhost:5101/Functions`;

  // constructor(private http:HttpClient){}

  // public getFunctions():Observable<Array<FunctionModel>>{

  //   return this.http.get(this.apiUrl+"/GetAll").pipe(map ( (element) => element as Array<FunctionModel>));

  // }

  // public createFunction = (cmd: FunctionModel):Observable<any> => {

  //   cmd.id=0;
  //   return  this.http.post(`${ this.apiUrl }/Create`, cmd);

  // }

  // public updateFunction = (cmd: FunctionModel):Observable<any> => {

  //   return this.http.put<any>(`${ this.apiUrl }/Update`, cmd);
  // }

  // // public deleteFunction = (id:string):Observable<any> => {

  // //   let params = new HttpParams();
  // //   params = params.append('Id',id);

  // //   return this.http.delete<any>(`${ this.apiUrl }/Delete`, { params : params});
  // // }

  // public deleteFunctionsByIds = (idList:Array<string>):Observable<any> => {

  //   return this.http.post<any>(`${ this.apiUrl }/DeleteByList`, idList);

  // }
}
