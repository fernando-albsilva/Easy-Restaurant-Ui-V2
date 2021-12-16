import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';

import { TableAndCommandManagement } from './table-and-command-management/table-and-command-management.component';
import { WorkerFunction } from './worker-function/worker-function.component';
import { WorkerComponent } from './worker/worker.component';

const routes: Routes = [
    { path: 'worker-function', component: WorkerFunction },
    { path: 'worker', component: WorkerComponent },
    { path: 'product', component: ProductComponent },
    { path: 'management', component: TableAndCommandManagement },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRoutingModule {}
