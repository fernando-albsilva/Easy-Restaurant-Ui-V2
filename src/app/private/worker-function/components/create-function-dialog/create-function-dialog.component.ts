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
    @Inject(MAT_DIALOG_DATA) public data: FunctionModel
    ) {}


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
    const isEmpty = this.verifyIfInputValueIsEmpty();
    if(this.isNew && !isEmpty){
      this.dialogRef.close({data:this.function,type:"save"});
    }
    else if(!isEmpty){
      this.dialogRef.close({data:this.function,type:"update"});
    }
  }

  private verifyIfInputValueIsEmpty = () => {return this.function.type === '';}
}
