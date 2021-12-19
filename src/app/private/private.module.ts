import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { ErHttpRequestService } from './services/er-http-request.service';

import { PrivateRoutingModule } from './private-routing.module';
import { ProductModule } from './product/product.module';
import { TableAndAccountManagementModule } from './table-and-command-management/table-and-account-management.module';
import { WorkerFunctionModule } from './worker-function/worker-function.module';
import { WorkerModule } from './worker/worker.module';
import { AuthService } from '../services/auth.service';

@NgModule({
    declarations: [],
    imports: [PrivateRoutingModule, WorkerFunctionModule, WorkerModule, ProductModule, TableAndAccountManagementModule],
    exports: [],
    providers: [ErHttpRequestService, AuthService, AuthGuard],
})
export class PrivateModule {}
