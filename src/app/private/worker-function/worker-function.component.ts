import { Component, OnInit } from '@angular/core';
import { FunctionApi } from './api/function-api';
import { FunctionModel } from './Model/FunctionModel';

@Component({
  selector: 'worker-function',
  templateUrl: './worker-function.component.html',
  styleUrls: ['./worker-function.component.scss']
})
export class WorkerFunction implements OnInit {

  public erPageListContext: string = 'function';
  public erPageListOperationsPermited: Array<string> = ["add","edit","delete"];

  public functions: Array<FunctionModel> = [];

  constructor (private functionApi: FunctionApi) {

  }

  ngOnInit(): void {
    this.functionApi.getFunctions().subscribe ( requestResult => {
        this.functions = requestResult;
    });
  }

}
