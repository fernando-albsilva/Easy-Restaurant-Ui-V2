import { HomeModule } from './public/home/home-module.module';
import { WorkerFunctionModule } from './private/worker-function/worker-function.module';
import { SharedModule } from './public/shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    HomeModule,
    WorkerFunctionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
