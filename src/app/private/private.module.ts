import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { ErHttpRequestService } from './services/er-http-request.service';

import { PrivateRoutingModule } from './private-routing.module';
import { ProductModule } from './product/product.module';
import { WorkerFunctionModule } from './worker-function/worker-function.module';
import { WorkerModule } from './worker/worker.module';
import { AuthService } from '../services/auth.service';
import { CheckManagementModule } from './check-management/check-management.module';
import { QueryModule } from './query/query.module';
import { UserModule } from './user/user.module';

@NgModule({
    declarations: [
  ],
    imports: [
        PrivateRoutingModule,
        WorkerFunctionModule,
        WorkerModule,
        ProductModule,
        UserModule,
        CheckManagementModule,
        QueryModule
    ],
    exports: [],
    providers: [ErHttpRequestService, AuthService, AuthGuard],
})
export class PrivateModule {}
