import { FunctionModel } from '../../worker-function/Model/FunctionModel';

export class WorkerModel {
    public id: string = '';
    public name: string = '';
    public cpf: string = '';
    public phoneNumber: string = '';
    public address: string = '';
    public email: string = '';
    public function: FunctionModel = new FunctionModel();
}

export class WorkerFlatModel {
    public id: string = '';
    public name: string = '';
    public cpf: string = '';
    public phoneNumber: string = '';
    public address: string = '';
    public email: string = '';
    public type: string = '';
}
//TODO passar o worker flat model para o er page list para nao aparecer o type

export class Functions {
    public functionList: Array<FunctionModel> = [];

    constructor(list: Array<FunctionModel>) {
        this.functionList = list;
    }
}

// export class FunctionModel{

//     public id:number = 0;
//     public type:string="";

// }
