import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckManagementComponent } from './check-management.component';
import { SharedModule } from '../shared/shared.module';
import { ManagementLeftMenuComponent } from './components/management-left-menu/management-left-menu.component';
import { ManagementRightMenuComponent } from './components/management-right-menu/management-right-menu.component';
import { TypeChekHeaderMenu } from './components/type-check-header-menu/type-check-header-menu.component';
import { ManagementTablesComponent } from './components/management-tables/management-tables.component';
import { TableComponent } from './components/management-tables/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { CheckManagementApi } from './api/check-management.api';
import { IndividualCheckComponent } from './components/management-individual-checks/individual-check/individual-check.component';
import { CheckProductList } from './components/edit-table-dialog/check-product-list/check-product-list.component';
import { EditTableDialog } from './components/edit-table-dialog/edit-table-dialog.component';
import { ManagementIndividualChecksComponent } from './components/management-individual-checks/management-individual-checks.component';
import { CheckManagementSettingsDialogComponent } from './components/type-check-header-menu/check-management-settings-dialog/check-management-settings-dialog.component';

@NgModule({
    declarations: [
        CheckManagementComponent,
        ManagementLeftMenuComponent,
        ManagementRightMenuComponent,
        ManagementTablesComponent,
        ManagementIndividualChecksComponent,
        TypeChekHeaderMenu,
        TableComponent,
        IndividualCheckComponent,
        EditTableDialog,
        CheckProductList,
        CheckManagementSettingsDialogComponent,
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        SharedModule,
        DirectivesModule,
    ],
    providers: [CheckManagementApi],
})
export class CheckManagementModule {}
