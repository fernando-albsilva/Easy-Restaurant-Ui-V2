import { DialogService } from './../../services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateFunctionDialog } from './components/create-function-dialog/create-function-dialog.component';
import { FunctionApi } from './api/function-api';
import { FunctionModel } from './Model/FunctionModel';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { SortService } from 'src/app/services/sort.service';



@Component({
  selector: 'worker-function',
  templateUrl: './worker-function.component.html',
  styleUrls: ['./worker-function.component.scss']
})
export class WorkerFunction implements OnInit {

  public erPageListContext: string = 'function';
  public erPageListOperationsPermited: Array<string> = ["add","edit","delete"];

  public functions: Array<FunctionModel> = [];

  private _byTypeProperty: string = "type";

  constructor (
    private functionApi: FunctionApi,
    public dialog: MatDialog,
    private erMessagesSnackbar: ErMessages,
    private messages: MessagesKeys,
    private sortService: SortService,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.functionApi.getFunctions().subscribe ( requestResult => {
      this.functions = this.sortService.sortListByObjectProperty(requestResult,this._byTypeProperty);
    });
  }

  public addFunction = () => {
    const dialogRef = this.createDialog();

    dialogRef.afterClosed().subscribe( (response:any) => {
      const canSave = response && response.type === 'save';
      if(canSave) {this.handleFunctionCreation(response.data)}
    });
  }

  public deleteFunction = (selectedItems:any) => {this.handleFunctionDelete(selectedItems);}

  public updateFunction = (selectedItem:any) => {

    const dialogData = selectedItem;
    const dialogRef = this.createDialog(dialogData);

    dialogRef.afterClosed().subscribe( (response:any) => {
      const canUpdate = response && response.type === 'update';
      if(canUpdate) {this.handleFunctionUpdate(response.data)}
    });
  }

  private createDialog = (dialogData?:FunctionModel) => {

    const height = '350px';
    const width = '500px';

    if(dialogData){
      const dialogRef = this.dialogService.createDialog(CreateFunctionDialog,height,width,dialogData);
      return dialogRef;
    }
    else{
      const dialogRef = this.dialogService.createDialog(CreateFunctionDialog,height,width);
      return dialogRef;
    }
  }

  private handleFunctionCreation = (workerfunction: FunctionModel) => {
    this.functionApi.createFunction(workerfunction).subscribe(
      result => {
        this.getFunctions();
        this.erMessagesSnackbar.openSnackBar(this.messages.successfullyCreated,"sucess");
      },
      erro => {console.log(erro);}
    );
  }

  private handleFunctionUpdate = (workerfunction: FunctionModel) => {
    this.functionApi.updateFunction(workerfunction).subscribe(
      result => {
        this.getFunctions();
        this.erMessagesSnackbar.openSnackBar(this.messages.successfullyUpdated,"sucess");
      },
      erro => {console.log(erro);}
    );

  }
  private handleFunctionDelete = (functionIds: Array<string>) => {
    this.functionApi.deleteFunctionsByIds(functionIds).subscribe(
      result => {
        this.getFunctions();
        this.erMessagesSnackbar.openSnackBar(this.messages.successfullyDeleted,"sucess");
      },
      erro => {console.log(erro);}
    );
  }

  public getFunctions = () => {
      this.functionApi.getFunctions().subscribe((response:Array<FunctionModel>) =>{
      this.functions = this.sortService.sortListByObjectProperty(response,this._byTypeProperty);
   });
  }
}
