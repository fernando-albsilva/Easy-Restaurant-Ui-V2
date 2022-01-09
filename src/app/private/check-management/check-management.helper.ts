import { ProductModel } from "../product/Model/product.model";
import { ProductInfo } from "./model/check-management.model";

export class CheckManagementHelper {

    public generateProductinfo = (product:ProductModel): ProductInfo => {
        let productInfo: ProductInfo = {
            name:product.name, 
            unitValue:product.unitValue,
            quantity: product.quantity,
            total: this.getTotalValueOfProduct(product.unitValue,product.quantity),
            percentage: (this.getTotalProductPercentage(product.unitValue,product.quantity))
        };

        return productInfo;
    }

    private getTotalValueOfProduct = (unitValue:number,quantity:number) => {
        return unitValue*quantity;
    }
    
    private getTotalProductPercentage = (unitValue:number,quantity:number):number => {
        return (unitValue*quantity*0.1);
    }
}