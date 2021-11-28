import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { FunctionModel } from "../../Model/FunctionModel";


@Component({
  selector: 'create-function-dialog',
  templateUrl: 'create-function-dialog.component.html',
  styleUrls: ['create-function-dialog.component.scss']
})

export class CreateFunctionDialog implements OnInit{

  public function : FunctionModel = new FunctionModel();
  public isNew: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CreateFunctionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: FunctionModel) {}


  ngOnInit(): void {
    if(this.data){
      this.isNew = false;
      this.function = this.data;
    }

  }

  public onCancel = (): void => {
    this.dialogRef.close();
  }

  public onSave = (): void => {
    if(this.isNew)
    {
        // if(this.function.type)
        // {
        //   this.dialogRef.close({response:this.function,responseType:"save"});
        // }else{
        //  this.messageSent.next({type:"error", messageSent : `${PageListMessages.allFieldsMustBeFill}`});
        // }
    }
    else
    {
      // if(this.function.type)
      // {
      //   this.dialogRef.close({response:this.function,responseType:"update"});
      // }
      // else
      // {
      //  this.messageSent.next({type:"error", messageSent : `${PageListMessages.allFieldsMustBeFill}`});
      // }
    }
  }

}
