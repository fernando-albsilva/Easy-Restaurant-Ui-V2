import { NgModule } from '@angular/core';

import { PrivateRoutingModule } from './private-routing.module';
import { TableAndAccountManagementModule } from './table-and-command-management/table-and-account-management.module';
import { WorkerFunctionModule } from './worker-function/worker-function.module';
import { WorkerModule } from './worker/worker.module';

@NgModule({
    declarations: [],
    imports: [PrivateRoutingModule, WorkerFunctionModule, WorkerModule, TableAndAccountManagementModule],
    exports: [],
    providers: [],
})
export class PrivateModule {}
