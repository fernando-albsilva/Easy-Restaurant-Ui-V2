import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { FunctionCardComponent } from './er-page-list/cards/function-card/function-card.component';
import { ErPageList } from './er-page-list/er-page-list.component';
import { ErTopMenu } from './er-top-menu/er-top-menu.component';
import { ErBadge } from './er-badge/er-badge.component';
import { WorkerCardComponent } from './er-page-list/cards/workers-card/worker-card.component';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { ErPageListFilterComponent } from './er-page-list/components/er-page-list-filter/er-page-list-filter.component';
import { ProductCardComponent } from './er-page-list/cards/product-card/product-card.component';
import { ErPageListSideMenuComponent } from './er-page-list/er-page-list-side-menu/er-page-list-side-menu.component';

@NgModule({
    declarations: [
        ErTopMenu,
        ErBadge,
        ErPageList,
        ErPageListSideMenuComponent,
        ErPageListFilterComponent,
        FunctionCardComponent,
        WorkerCardComponent,
        ProductCardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        DirectivesModule,
        MatSelectModule,
        MatSelectModule,
    ],
    exports: [
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        ErTopMenu,
        ErBadge,
        ErPageList,
        ErPageListSideMenuComponent,
        ErPageListFilterComponent,
        FunctionCardComponent,
        WorkerCardComponent,
        ProductCardComponent,
    ],
})
export class SharedModule {}
