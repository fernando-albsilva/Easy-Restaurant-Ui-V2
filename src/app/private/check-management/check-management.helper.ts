import { ProductModel } from "../product/Model/product.model";
import { ProductInfo, TableModel } from "./model/check-management.model";

export class CheckManagementHelper {

    public findTableIndexByNumber = (tablesList:Array<TableModel>,tableNumber: number): number | undefined => {
        const index = tablesList.findIndex((table) => {
            return table.number === tableNumber;
        });

        if (index === -1) {
            return undefined;
        } else {
            return index;
        }
    };

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