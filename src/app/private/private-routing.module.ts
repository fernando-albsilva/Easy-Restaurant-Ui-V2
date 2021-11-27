import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableAndCommandManagement } from './table-and-command-management/table-and-command-management.component';
import { WorkerFunction } from './worker-function/worker-function.component';


const routes: Routes = [
      { path: 'management',  component: TableAndCommandManagement },
      { path: 'worker-function', component: WorkerFunction }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
