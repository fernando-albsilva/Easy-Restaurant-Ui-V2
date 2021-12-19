import { NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HomeModule } from './home/home-module.module';

import { PublicRoutingModule } from './public-routing.module';

@NgModule({
    declarations: [],
    imports: [HomeModule, PublicRoutingModule],
    exports: [],
    providers: [AuthService],
})
export class PublicModule {}
