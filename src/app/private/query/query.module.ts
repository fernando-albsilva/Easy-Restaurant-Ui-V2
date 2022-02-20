import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { QueryComponent } from './query.component';
import { QueryApi } from './api/query.api';



@NgModule({
  declarations: [
    QueryComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    SharedModule,
    DirectivesModule,
  ],
  providers: [
    QueryApi
  ]
})
export class QueryModule { }
