import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableAndCommandManagement } from './table-and-command-management/table-and-command-management.component';
import { WorkerFunction } from './worker-function/worker-function.component';


const routes: Routes = [
  { path: 'private',
    children:
    [
      { path: 'management',  component: TableAndCommandManagement },
      { path: 'worker-function', component: WorkerFunction}
    ]
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
