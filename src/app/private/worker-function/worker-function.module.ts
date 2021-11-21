import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../public/shared/shared.module';
import { WorkerFunction } from './worker-function.component';





@NgModule({
  declarations: [
    WorkerFunction
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[]
})
export class WorkerFunctionModule { }
