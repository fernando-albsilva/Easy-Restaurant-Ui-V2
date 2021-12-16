import { FunctionModel } from '../../worker-function/Model/function.model';

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
export class Functions {
    public functionList: Array<FunctionModel> = [];

    constructor(list: Array<FunctionModel>) {
        this.functionList = list;
    }
}
