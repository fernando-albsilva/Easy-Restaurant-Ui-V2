import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CheckManagementComponent } from './check-management.component';
import { SharedModule } from '../shared/shared.module';
import { ManagementLeftMenuComponent } from './components/management-left-menu/management-left-menu.component';
import { ManagementRightMenuComponent } from './components/management-right-menu/management-right-menu.component';
import { TypeChekHeaderMenu } from './components/type-check-header-menu/type-check-header-menu.component';
import { ManagementTablesComponent } from './components/management-tables/management-tables.component';
import { TableComponent } from './components/management-tables/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { EditTableDialog } from './components/management-tables/edit-table-dialog/edit-table-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckManagementApi } from './api/check-management.api';

@NgModule({
    declarations: [
        CheckManagementComponent,
        ManagementLeftMenuComponent,
        ManagementRightMenuComponent,
        ManagementTablesComponent,
        TypeChekHeaderMenu,
        TableComponent,
        EditTableDialog,
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        SharedModule,
        DirectivesModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
    ],
    providers: [CheckManagementApi],
})
export class CheckManagementModule {}
