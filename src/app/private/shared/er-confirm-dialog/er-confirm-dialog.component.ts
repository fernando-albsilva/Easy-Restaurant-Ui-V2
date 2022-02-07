import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'er-confirm-dialog',
  template:''
})

export class ErConfirmDialog{

  @Input() set open(option: boolean) {
      if(option){
        this.handleCreateDialog();
      }
  }

  @Output() public openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor (
    private _dialogService: DialogService
  ) {}

  public handleCreateDialog = (): void => {
  
    const dialogRef = this.createDialog(
      //passar data aqui
    );
  
    dialogRef.afterClosed().subscribe((response: any) => {
        // this.checkResult.emit(response);
    });
  }

  private createDialog = (dialogData?: any): any => {
    const height = '250px';
    const width = '600px';

    if (dialogData) {
        const dialogRef = this._dialogService.createDialog(ConfirmDialog, height, width, dialogData);
        return dialogRef;
    } else {
        const dialogRef = this._dialogService.createDialog(ConfirmDialog, height, width);
        return dialogRef;
    }
};

}