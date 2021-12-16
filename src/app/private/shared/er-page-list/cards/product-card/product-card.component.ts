import { Component, Input } from '@angular/core';

import { MessagesKeys } from '../../../../../services/messages-keys.service';

import { ProductModel } from 'src/app/private/product/Model/product.model';

@Component({
    selector: 'product-card',
    templateUrl: 'product-card.component.html',
    styleUrls: ['product-card.component.scss', '../styles/shared-card-style.scss'],
})
export class ProductCardComponent {
    @Input() set item(productModel: ProductModel) {
        this.productModel = productModel;
    }

    @Input() selected = false;

    public productModel: ProductModel = new ProductModel();

    constructor(public messages: MessagesKeys) {}
}
