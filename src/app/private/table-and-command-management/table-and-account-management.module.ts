import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableAndCommandManagement } from './table-and-command-management.component';
import { tableAndCommandManagementRoutingModule } from './table-and-command-management.routing.module';




@NgModule({
  declarations: [
    TableAndCommandManagement
  ],
  imports: [
    CommonModule,
    tableAndCommandManagementRoutingModule
  ],
})
export class TableAndAccountManagementModule { }
