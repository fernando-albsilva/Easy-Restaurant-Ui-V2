import { TableAndCommandManagement } from './private/table-and-command-management/table-and-command-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';


const appRoutes: Routes = [
  { path: 'public', component: HomeComponent},
  { path: 'private',
    children:
    [
      { path: 'management',  component: TableAndCommandManagement }
    ]
  }
];
// { path: '**', component: HomeComponent},
// { path: '**', redirectTo: ''},
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
