import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user.component';
import { UserApi } from './api/user.api';

@NgModule({
    declarations: [UserComponent],
    imports: [HttpClientModule, CommonModule, SharedModule, DirectivesModule],
    exports: [],
    providers: [UserApi],
})
export class UserModule {}
