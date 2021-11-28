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
      this.functions = requestResult;
    });
  }

  public addFunction = () => {
    console.log("criando dialog")

    const dialogRef = this.createDialog();

    dialogRef.afterClosed().subscribe( (element:any) => {
      // if(element)
      // {
      //   if(element.responseType === 'save')
      //   {
      //     this.functionApi.createFunction(element.response).subscribe(
      //       result => {
      //         console.log(result)
      //         this.getFunctions();
      //         this.messageSent.next({type:"valid", messageSent : `${PageListMessages.productCreatedSucessfull}`});
      //         this.clearListOfSelectedItems.next();
      //       },
      //       erro => {
      //           console.log(erro);
      //       }
      //     );
      //   }
      // }

    });
  }

  private createDialog = () => {

    const dialogRef = this.dialog.open(CreateFunctionDialog, {
      height: '350px',
      width: '500px'
    });

    return dialogRef;
  }

}
