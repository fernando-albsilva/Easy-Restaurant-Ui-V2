import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './product.component';
import { HttpClientModule } from '@angular/common/http';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { SharedModule } from '../shared/shared.module';
import { ProductApi } from './api/product.api';
import { CreateProductDialog } from './create-product-dialog/create-product-dialog.component';

@NgModule({
    declarations: [ProductComponent, CreateProductDialog],
    imports: [HttpClientModule, CommonModule, SharedModule, DirectivesModule],
    exports: [],
    providers: [ProductApi],
})
export class ProductModule {}
