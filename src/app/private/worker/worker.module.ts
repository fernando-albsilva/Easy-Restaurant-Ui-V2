import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { WorkerApi } from './api/worker-api';
import { CreateEditWorkerDialog } from './components/create-edit-worker-dialog/create-edit-worker-dialog.component';
import { WorkerComponent } from './worker.component';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { SharedModule } from '../shared/shared.module';
import { FunctionApi } from '../worker-function/api/function-api';

@NgModule({
    declarations: [WorkerComponent, CreateEditWorkerDialog],
    imports: [HttpClientModule, CommonModule, SharedModule, DirectivesModule],
    exports: [],
    providers: [WorkerApi, FunctionApi],
})
export class WorkerModule {}
