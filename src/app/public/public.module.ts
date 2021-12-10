import { NgModule } from '@angular/core';
import { HomeModule } from './home/home-module.module';

import { PublicRoutingModule } from './public-routing.module';

@NgModule({
    declarations: [],
    imports: [HomeModule, PublicRoutingModule],
    exports: [],
    providers: [],
})
export class PublicModule {}
