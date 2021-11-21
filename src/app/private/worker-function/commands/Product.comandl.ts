export class ProductCommand{
    
    public id:string="";
    public name:string="";
    public unitValue:number=0;
    public cost:number=0;

}

export class ProductDeleteCommand{
    
    public id:string="";

}

export class DeleteProductListCommand{
    
    public id: Array<string>  = [];

}
