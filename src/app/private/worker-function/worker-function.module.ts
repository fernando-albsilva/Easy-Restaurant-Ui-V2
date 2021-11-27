import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../public/shared/shared.module';
import { WorkerFunction } from './worker-function.component';
import { FunctionApi } from './api/function-api';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    WorkerFunction
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
