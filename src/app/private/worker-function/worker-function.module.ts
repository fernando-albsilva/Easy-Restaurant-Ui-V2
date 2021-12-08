import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerFunction } from './worker-function.component';
import { FunctionApi } from './api/function-api';
import { HttpClientModule } from '@angular/common/http';
import { CreateFunctionDialog } from './components/create-function-dialog/create-function-dialog.component';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WorkerFunction, CreateFunctionDialog],
  imports: [HttpClientModule, CommonModule, SharedModule, DirectivesModule],
  exports: [],
  providers: [FunctionApi],
})
export class WorkerFunctionModule {}
