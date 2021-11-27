import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule }   from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FunctionCardComponent } from './er-page-list/cards/function-card/function-card.component';
import { ErPageList } from './er-page-list/er-page-list.component';
import { ErSnackBar } from './er-snack-bar/er-snack-bar.component';
import { ErTopMenu } from './er-top-menu/er-top-menu.component';
import { ErPageListSideMenu } from './er-page-list/er-page-list-side-menu/er-page-list-side-menu.component';
import { ErBadge } from './er-badge/er-badge.component';



@NgModule({
  declarations: [
    ErTopMenu,
    ErSnackBar,
    ErBadge,
    ErPageList,
    ErPageListSideMenu,
    FunctionCardComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ErTopMenu,
    ErSnackBar,
    ErBadge,
    ErPageList,
    ErPageListSideMenu,
    FunctionCardComponent
  ]
})
export class SharedModule { }
