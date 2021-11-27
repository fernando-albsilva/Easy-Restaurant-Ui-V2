import { HomeModule } from './home/home-module.module';
import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';





@NgModule({
  declarations: [

  ],
  imports: [
   HomeModule,
   PublicRoutingModule
  ],
  exports:[

  ]
})
export class PublicModule { }
