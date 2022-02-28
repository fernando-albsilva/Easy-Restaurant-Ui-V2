import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { QueryComponent } from './query.component';
import { QueryApi } from './api/query.api';
import { QueryDetailDialogComponent } from './components/query-detail-dialog/query-detail-dialog.component';



@NgModule({
  declarations: [
    QueryComponent,
    QueryDetailDialogComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    SharedModule,
    DirectivesModule,
    MatTableModule,
  ],
  providers: [
    QueryApi
  ]
})
export class QueryModule { }
