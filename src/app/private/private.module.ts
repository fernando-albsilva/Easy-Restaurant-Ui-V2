import { NgModule } from '@angular/core';

import { PrivateRoutingModule } from './private-routing.module';
import { WorkerFunctionModule } from './worker-function/worker-function.module';



@NgModule({
  declarations: [

  ],
  imports: [
   PrivateRoutingModule,
   WorkerFunctionModule
  ],
  exports:[

  ]
})
export class PrivateModule { }
