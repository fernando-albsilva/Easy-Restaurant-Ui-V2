import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessagesKeys {
    //Related to create
    public readonly create: string = 'Criar';
    public readonly successfullyCreated: string = 'Criado com sucesso';
    public readonly createFunction: string = 'Criar função';
    public readonly createWorker: string = 'Criar funcionário';
    public readonly createProduct: string = 'Criar produto';
    public readonly createUser: string = 'Criar usuário';

    //Related to edit/updates
    public readonly edit: string = 'Editar';
    public readonly successfullyUpdated: string = 'Editado com sucesso';
    public readonly oneItemHasToBeSelected: string = 'É preciso ter um item selecionado para editar';
    public readonly editFunction: string = 'Editar função';
    public readonly editWorker: string = 'Editar funcionário';
    public readonly editProduct: string = 'Editar produto';
    public readonly editUser: string = 'Editar usuário';

    //Related to delete/remove
    public readonly remove: string = 'Remover';
    public readonly delete: string = 'Deletar';
    public readonly excluir: string = 'Excluir';
    public readonly successfullyDeleted: string = 'Deletado com sucesso';
    public readonly isNecessaryHaveOneOrMoreItemsSelected: string = 'É preciso ter um ou mais items selecionados para remover';

    //Related to add
    public readonly add: string = 'Adicionar';
    
    //Related to detail
    public readonly detail: string = 'Detalhar';
   
    //Related to configuration
    public readonly configuration: string = 'Configuração';

    //Related to close
    public readonly close: string = 'Fechar';
    public readonly closeCheck: string = 'Finalizar conta';

    //Related to produtc
    public readonly product: string = 'Produto';
    public readonly products: string = 'Produtos';

    //Related to employee
    public readonly employee: string = 'Funcionário';

    //Related to function
    public readonly function: string = 'Função';

    //Related to administrator
    public readonly administrator: string = 'Administrador';

    //Related to administrator
    public readonly user: string = 'Usuário';

    //Related to home
    public readonly home: string = 'Home';

    //Related to name
    public readonly name: string = 'Nome';

    //Related to name
    public readonly type: string = 'Tipo';
   
    //Related to name
    public readonly date: string = 'Data';

    //Related to name
    public readonly email: string = 'Email';

    //Related to password
    public readonly password: string = 'Senha';

    //Related to name
    public readonly cpf: string = 'Cpf';

    //Related to phone
    public readonly phone: string = 'Telefone';

    //Related to address
    public readonly address: string = 'Endereço';

    //Related to filter
    public readonly searchFor: string = 'Procurar por ...';

    //Related to filter
    public readonly option: string = 'Opção';

    //Related to unit / value
    public readonly unitValue: string = 'Valor unitário';

    //Related to code
    public readonly code: string = 'Código';

    //Related to unit / value
    public readonly cost: string = 'Custo';
    public readonly unitCost: string = 'Custo Unitário';

    //Related to unit / value
    public readonly currencyHint: string = '1554.15';

    //Related to role
    public readonly role: string = 'Papel';

    //Related to role
    public readonly number: string = 'Número';

    //Related to role
    public readonly stillRemainFieldToBeFiled: string = 'Ainda há campos a serem preenchidos';

    //Related to table
    public readonly table: string = 'Mesa';
    public readonly tableQuantity: string = 'Quantidade de mesas';

    //Related to check
    public readonly checkControl: string = 'Controle de conta';
    public readonly checkDetails: string = 'Detalhes da conta';
    public readonly check: string = 'Conta';
    
    //Related to individual check
    public readonly individualCheckCommand: string = 'Commanda';
    public readonly individualCheckQuantity: string = 'Quantidade de Commandas';

    //Related to back
    public readonly back: string = 'Voltar';

    //Related to include
    public readonly include: string = 'Incluir';

    //Related to client
    public readonly clientName: string = 'Nome do cliente';

    //Related to worker
    public readonly worker: string = 'Funcionário';
    
    //Related to attendant
    public readonly attendant: string = 'Atendente';
    
    //Related to info
    public readonly informations: string = 'Informações';
    
    //Related to start
    public readonly start: string = 'Iniciar';
    
    //Related to waiter
    public readonly waiter: string = 'Garçom';

    //Related to percent / percentage
    public readonly tenPerCent: string = '10%';

    //Related to total / percentage / percent
    public readonly total: string = 'Total';
    public readonly totalWithTenPerCent: string = 'Total + 10%';

    //Related to quantity
    public readonly quantity: string = 'Quantidade';

    //Related to quantity / weight / currency / unity
    public readonly qtd: string = 'Qtd';
    public readonly und: string = 'Und';
    
    //Related to invoice / revenue / expense / balance
    public readonly checkClosedSucessfully: string = 'Conta fechada com sucesso';
    public readonly invoiceInfo: string = 'Informações da fatura';
    public readonly revenue: string = 'Receita';
    public readonly revenuePlural: string = 'Receitas';
    public readonly expense: string = 'Despesa';
    public readonly balance: string = 'Saldo';
   
    //Related to confirm
    public readonly confirm: string = 'Confirmar';
   
    //Related to cancel
    public readonly cancel: string = 'Cancelar';
   
    //Related to er-confirm-dialog
    public readonly beCarefulWithDecision: string = 'Tenha certeza ao confirmar, pois essa decisão pode ser irreversível';
    public readonly beCarefulWhenDeleteProduct: string = 'Tenha certeza ao confirmar, pois esse produto será removido da conta de forma irreverssível';
    public readonly checkCloseConfirm: string = 'Ao confirma a conclusão da conta, a mesma não poderá ser reativada.';
    
    // Related to item kept
    public readonly itemWasKept: string = 'Item foi mantido';
    
    // Related to item duration
    public readonly duration: string = 'Duração';
    
    // Related to item duration
    public readonly query: string = 'Consulta';
    
    // Related to item editCheckManagementSettings
    public readonly editCheckManagementSettings: string = 'Editar opções da tela de gerenciamento';
    
    // Related to item total tables
    public readonly totalTables: string = 'Quantidade de mesas';
    
    // Related to item total individual checks
    public readonly totalIndividualChecks: string = 'Quantidade de comandas';
}
