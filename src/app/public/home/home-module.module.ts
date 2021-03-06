import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../private/shared/shared.module';

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [HomeComponent],
})
export class HomeModule {}
