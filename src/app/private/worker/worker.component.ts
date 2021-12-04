import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { WorkerApi } from './api/worker-api';
import { CreateEditWorkerDialog } from './components/create-edit-worker-dialog/create-edit-worker-dialog.component';
import { WorkerFlatModel, WorkerModel } from './Model/woker-model';



@Component({
  selector: 'worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {


  public erPageListContext: string = 'worker';
  public erPageListOperationsPermited: Array<string> = ["add","edit","delete"];

  public workers: Array<WorkerFlatModel> = [];

  constructor (
    private workerApi: WorkerApi,
    public dialog: MatDialog,
    private erMessagesSnackbar: ErMessages,
    private messages: MessagesKeys) {

  }

  ngOnInit(): void {
    this.workerApi.getWorkers().subscribe ( requestResult => {
      this.workers = this.sortListByType(requestResult);
    });
  }

  public addWorker = () => {
    const dialogRef = this.createDialog();

    dialogRef.afterClosed().subscribe( (response:any) => {
      if(response && response.type === 'save'){
        this.handleFunctionCreation(response.data);
      }
    });
  }

  public deleteWorker = (selectedItems:any) => {this.handleFunctionDelete(selectedItems);}

  public updateWorker = (selectedItem:any) => {

    const dialogData = selectedItem;
    const dialogRef = this.createDialog(dialogData);

    dialogRef.afterClosed().subscribe( (response:any) => {
      if(response && response.type === 'update'){
        this.handleFunctionUpdate(response.data);
      }
    });
  }

  private createDialog = (dialogData?:WorkerModel) => {

    if(dialogData){
      const dialogRef = this.dialog.open(CreateEditWorkerDialog, {
        height: '700px',
        width: '600px',
        data: {
          id: dialogData.id,
          type: dialogData.name
        }
      });
      return dialogRef;
    }
    else {
      const dialogRef = this.dialog.open(CreateEditWorkerDialog, {
        height: '700px',
        width: '600px'
      });
      return dialogRef;
    }
  }

  private handleFunctionCreation = (workerCommand: WorkerModel) => {
    this.workerApi.createWorker(workerCommand).subscribe(
      result => {
        this.getWorkers();
        this.erMessagesSnackbar.openSnackBar(this.messages.successfullyCreated,"sucess");
      },
      erro => {console.log(erro);}
    );
  }

  private handleFunctionUpdate = (workerCommand: WorkerModel) => {
    this.workerApi.updateWorker(workerCommand).subscribe(
      result => {
        this.getWorkers();
        this.erMessagesSnackbar.openSnackBar(this.messages.successfullyUpdated,"sucess");
      },
      erro => {console.log(erro);}
    );

  }
  private handleFunctionDelete = (workesIds: Array<string>) => {
    this.workerApi.deleteMultiplesWorkers(workesIds).subscribe(
      result => {
        this.getWorkers();
        this.erMessagesSnackbar.openSnackBar(this.messages.successfullyDeleted,"sucess");
      },
      erro => {console.log(erro);}
    );
  }

  public getWorkers = () => {
      this.workerApi.getWorkers().subscribe((response:Array<WorkerFlatModel>) =>{
      this.workers = this.sortListByType(response);
   });
  }

  private sortListByType = (list:Array<WorkerFlatModel>):Array<WorkerFlatModel> =>{
    return list.sort((a,b)=>{
      if (a.name > b.name) {return 1;}
      if (a.name < b.name) {return -1;}
      return 0;
    });
  }
}
