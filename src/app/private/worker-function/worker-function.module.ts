import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../public/shared/shared.module';
import { WorkerFunction } from './worker-function.component';
import { FunctionApi } from './api/function-api';
import { HttpClientModule } from '@angular/common/http';
import { CreateFunctionDialog } from './components/create-function-dialog/create-function-dialog.component';





@NgModule({
  declarations: [
    WorkerFunction,
    CreateFunctionDialog
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    SharedModule
  ],
  exports:[

  ],
  providers: [
    FunctionApi
  ],
})
export class WorkerFunctionModule { }
