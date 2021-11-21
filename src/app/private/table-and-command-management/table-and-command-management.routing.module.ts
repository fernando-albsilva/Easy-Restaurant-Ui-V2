import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableAndCommandManagement } from './table-and-command-management.component';



const tableAndCommandManagementRoutes: Routes = [
  { path: 'management', component: TableAndCommandManagement },
];

@NgModule({
  imports: [
    RouterModule.forRoot(tableAndCommandManagementRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class tableAndCommandManagementRoutingModule { }
