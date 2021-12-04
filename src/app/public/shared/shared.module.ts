import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule }   from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { FunctionCardComponent } from './er-page-list/cards/function-card/function-card.component';
import { ErPageList } from './er-page-list/er-page-list.component';
import { ErTopMenu } from './er-top-menu/er-top-menu.component';
import { ErPageListSideMenu } from './er-page-list/er-page-list-side-menu/er-page-list-side-menu.component';
import { ErBadge } from './er-badge/er-badge.component';



@NgModule({
  declarations: [
    ErTopMenu,
    ErBadge,
    ErPageList,
    ErPageListSideMenu,
    FunctionCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ErTopMenu,
    ErBadge,
    ErPageList,
    ErPageListSideMenu,
    FunctionCardComponent
  ]
})
export class SharedModule { }
