import { FunctionModel } from '../../worker-function/Model/function.model';

export class WorkerCommand {
    public id: string = '';
    public name: string = '';
    public cpf: string = '';
    public phoneNumber: string = '';
    public address: string = '';
    public email: string = '';
    public function: FunctionModel = new FunctionModel();
}
