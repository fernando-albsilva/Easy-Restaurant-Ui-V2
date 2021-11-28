import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateFunctionDialog } from './components/create-function-dialog/create-function-dialog.component';
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

  constructor (
    private functionApi: FunctionApi,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.functionApi.getFunctions().subscribe ( requestResult => {
      this.functions = this.sortListByType(requestResult);
    });
  }

  public addFunction = () => {
    const dialogRef = this.createDialog();

    dialogRef.afterClosed().subscribe( (response:any) => {
      if(response && response.type === 'save'){
        this.handleFunctionCreation(response.data);
      }
    });
  }

  public updateFunction = (selectedItem:any) => {

    const dialogData = selectedItem;
    const dialogRef = this.createDialog(dialogData);

    dialogRef.afterClosed().subscribe( (response:any) => {
      if(response && response.type === 'update'){
        this.handleFunctionUpdate(response.data);
      }
    });
  }

  private createDialog = (dialogData?:FunctionModel) => {

    if(dialogData){
      const dialogRef = this.dialog.open(CreateFunctionDialog, {
        height: '350px',
        width: '500px',
        data: {
          id: dialogData.id,
          type: dialogData.type
        }
      });
      return dialogRef;
    }
    else {
      const dialogRef = this.dialog.open(CreateFunctionDialog, {
        height: '350px',
        width: '500px'
      });
      return dialogRef;
    }
  }

  private handleFunctionCreation = (workerfunction: FunctionModel) => {
    this.functionApi.createFunction(workerfunction).subscribe(
      result => {this.getFunctions();},
      erro => {console.log(erro);}
    );
  }

  private handleFunctionUpdate = (workerfunction: FunctionModel) => {
    this.functionApi.updateFunction(workerfunction).subscribe(
      result => {this.getFunctions();},
      erro => {console.log(erro);}
    );
  }

  public getFunctions = () => {
      this.functionApi.getFunctions().subscribe((response:Array<FunctionModel>) =>{
      this.functions = this.sortListByType(response);
   });
  }

  private sortListByType = (list:Array<FunctionModel>):Array<FunctionModel> =>{
    return list.sort((a,b)=>{
      if (a.type > b.type) {return 1;}
      if (a.type < b.type) {return -1;}
      return 0;
    });
  }
}
