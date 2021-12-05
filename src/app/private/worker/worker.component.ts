import { DialogService } from './../../services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { SortService } from 'src/app/services/sort.service';
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
    private messages: MessagesKeys,
    private sortService: SortService,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.workerApi.getWorkers().subscribe ( requestResult => {
      this.workers = this.sortService.sortListByObjectProperty(requestResult,'name');
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

   const height = '680px';
   const width = '600px';
   if(dialogData){
     const dialogRef = this.dialogService.createDialog(CreateEditWorkerDialog,height,width,dialogData);
     return dialogRef;
   }
   else{
     const dialogRef = this.dialogService.createDialog(CreateEditWorkerDialog,height,width);
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
      this.workers = this.sortService.sortListByObjectProperty(response,'name');
   });
  }
}
