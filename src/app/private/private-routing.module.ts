import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ProductComponent } from './product/product.component';

import { CheckManagementComponent } from './check-management/check-management.component';
import { UserComponent } from './user/user.component';
import { WorkerFunction } from './worker-function/worker-function.component';
import { WorkerComponent } from './worker/worker.component';
import { QueryComponent } from './query/query.component';

const routes: Routes = [
    { path: 'worker-function', component: WorkerFunction, canActivate: [AuthGuard] },
    { path: 'worker', component: WorkerComponent, canActivate: [AuthGuard] },
    { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'management', component: CheckManagementComponent, canActivate: [AuthGuard] },
    { path: 'query', component: QueryComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRoutingModule {}
