import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UUID } from 'angular2-uuid';

import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { ObjectService } from 'src/app/services/object.service';
import { WorkerModel } from '../../Model/woker-model';

@Component({
  selector: 'create-edit-worker-dialog',
  templateUrl: 'create-edit-worker-dialog.component.html',
  styleUrls: ['create-edit-worker-dialog.component.scss'],
})
export class CreateEditWorkerDialog implements OnInit {
  public worker: WorkerModel = new WorkerModel();
  public isNew: boolean = true;

  constructor(
    private objectService: ObjectService,
    public messages: MessagesKeys,
    public dialogRef: MatDialogRef<CreateEditWorkerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: WorkerModel,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isNew = false;
      this.worker = this.data;
    } else {
      this.worker.id = UUID.UUID();
    }
  }

  public onCancel = (): void => {
    this.dialogRef.close();
  };

  public onSave = (): void => {
    const isEmpty = this.verifyIfInputValueIsEmpty();
    if (this.isNew && !isEmpty) {
      this.dialogRef.close({ data: this.worker, type: 'save' });
    } else if (!isEmpty) {
      this.dialogRef.close({ data: this.worker, type: 'update' });
    }
  };

  private verifyIfInputValueIsEmpty = () => {
    return this.objectService.isAnyPropertyEmpty(this.worker);
  };
}
