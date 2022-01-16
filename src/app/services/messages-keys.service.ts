import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessagesKeys {
    //Related to create
    public create: string = 'Criar';
    public successfullyCreated: string = 'Criado com sucesso';
    public createFunction: string = 'Criar função';
    public createWorker: string = 'Criar funcionário';
    public createProduct: string = 'Criar produto';
    public createUser: string = 'Criar usuário';

    //Related to edit/updates
    public edit: string = 'Editar';
    public successfullyUpdated: string = 'Editado com sucesso';
    public oneItemHasToBeSelected: string = 'É preciso ter um item selecionado para editar';
    public editFunction: string = 'Editar função';
    public editWorker: string = 'Editar funcionário';
    public editProduct: string = 'Editar produto';
    public editUser: string = 'Editar usuário';

    //Related to delete/remove
    public remove: string = 'Remover';
    public delete: string = 'Deletar';
    public excluir: string = 'Excluir';
    public successfullyDeleted: string = 'Deletado com sucesso';
    public isNecessaryHaveOneOrMoreItemsSelected: string = 'É preciso ter um ou mais items selecionados para remover';

    //Related to add
    public add: string = 'Adicionar';

    //Related to close
    public close: string = 'Fechar';
    public closeCheck: string = 'Finalizar conta';

    //Related to produtc
    public product: string = 'Product';

    //Related to employee
    public employee: string = 'Funcionário';

    //Related to function
    public function: string = 'Função';

    //Related to administrator
    public administrator: string = 'Administrador';

    //Related to administrator
    public user: string = 'Usuário';

    //Related to home
    public home: string = 'Home';

    //Related to name
    public name: string = 'Nome';

    //Related to name
    public type: string = 'Tipo';

    //Related to name
    public email: string = 'Email';

    //Related to password
    public password: string = 'Senha';

    //Related to name
    public cpf: string = 'Cpf';

    //Related to phone
    public phone: string = 'Telefone';

    //Related to address
    public address: string = 'Endereço';

    //Related to filter
    public searchFor: string = 'Procurar por ...';

    //Related to filter
    public option: string = 'Opção';

    //Related to unit / value
    public unitValue: string = 'Valor unitário';

    //Related to code
    public code: string = 'Código';

    //Related to unit / value
    public cost: string = 'Custo';
    public unitCost: string = 'Custo Unitário';

    //Related to unit / value
    public currencyHint: string = '1554.15';

    //Related to role
    public role: string = 'Papel';

    //Related to role
    public number: string = 'Número';

    //Related to role
    public stillRemainFieldToBeFiled: string = 'Ainda há campos a serem preenchidos';

    //Related to table
    public table: string = 'Mesa';
    public tableQuantity: string = 'Quantidade de mesas';

    //Related to check
    public checkControl: string = 'Controle de conta';
    public checkDetails: string = 'Detalhes da conta';
    public check: string = 'Conta';
    
    //Related to individual check
    public individualCheckCommand: string = 'Commanda';
    public individualCheckQuantity: string = 'Quantidade de Commandas';

    //Related to back
    public back: string = 'Voltar';

    //Related to include
    public include: string = 'Incluir';

    //Related to client
    public clientName: string = 'Nome do cliente';

    //Related to worker
    public worker: string = 'Funcionário';
    
    //Related to info
    public informations: string = 'Informações';
    
    //Related to start
    public start: string = 'Iniciar';
    
    //Related to waiter
    public waiter: string = 'Garçom';

    //Related to percent / percentage
    public tenPerCent: string = '10%';

    //Related to total
    public total: string = 'Total';

    //Related to quantity
    public quantity: string = 'Quantidade';

    //Related to quantity / weight / currency / unity
    public qtd: string = 'Qtd';
    public und: string = 'Und';
    
    //Related to invoice
    public checkClosedSucessfully: string = 'Conta fechada com sucesso';

}
