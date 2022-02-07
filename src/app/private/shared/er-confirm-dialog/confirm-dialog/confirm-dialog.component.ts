import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditTableDialog } from 'src/app/private/check-management/components/management-tables/edit-table-dialog/edit-table-dialog.component';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialog{

  constructor ( public dialogRef: MatDialogRef<EditTableDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
      dialogRef.disableClose = true;
  } 


}