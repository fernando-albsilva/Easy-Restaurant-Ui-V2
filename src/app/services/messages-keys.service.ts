import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesKeys {

  //Related to create
  public create = "Criar"
  public successfullyCreated = "Criado com sucesso";
  public createFunction = "Criar função";

  //Related to edit/updates
  public edit = "Editar";
  public successfullyUpdated = "Editado com sucesso";
  public oneItemHasToBeSelected = "É preciso ter um item selecionado para editar";
  public editFunction = "Editar função";

  //Related to delete/remove
  public remove = "Remover";
  public delete = "Deletar";
  public successfullyDeleted = "Deletado com sucesso";
  public isNecessaryHaveOneOrMoreItemsSelected = "É preciso ter um ou mais items selecionados para remover";

  //Related to add
  public add = "Adicionar";

  //Related to close
  public close = "Fechar";

  //Related to produtc
  public product = "Product";

  //Related to employee
  public employee = "Funcionário";

  //Related to function
  public function = "Função";

  //Related to administrator
  public administrator = "Administrador";

  //Related to home
  public home = "Home";

}
