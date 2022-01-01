import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckManagementComponent } from './check-management.component';
import { SharedModule } from '../shared/shared.module';
import { ManagementLeftMenuComponent } from './components/management-left-menu/management-left-menu.component';
import { ManagementRightMenuComponent } from './components/management-right-menu/management-right-menu.component';
import { TypeChekHeaderMenu } from './components/type-check-header-menu/type-check-header-menu.component';

@NgModule({
    declarations: [
        CheckManagementComponent,
        ManagementLeftMenuComponent,
        ManagementRightMenuComponent,
        TypeChekHeaderMenu,
    ],
    imports: [CommonModule, SharedModule],
})
export class CheckManagementModule {}
