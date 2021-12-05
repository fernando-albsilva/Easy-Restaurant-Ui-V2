import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
  selector: 'er-page-list',
  templateUrl: 'er-page-list.component.html',
  styleUrls: ['er-page-list.component.scss']
})
export class ErPageList {

  @Input() items:Array<any> = [];

  @Input() context: string = "";
  @Input() buttonsPermited: Array<string> = ["add","edit","delete"];

  @Output() addEvent = new EventEmitter<string>();
  @Output() updateEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<Array<string>>();

  public selectedItemsIds: Array<string> = [];

  constructor (
    private erMessagesSnackbar: ErMessages,
    private messages: MessagesKeys
    ) {}

  public handleSideMenuAction(type:string){
    switch (type) {
      case "add":
        this.handleAddEvent();
        break;

      case "edit":
        this.handleUpdateEvent();
        break;

      case "delete":
        this.handleDeleteEvent();
        break;

      default:
        break;
    }
  }

  public isContext = (type:string) => {return type === this.context;}

  public selectOrRemoveCardSelection = (id:string) => {
    const amISelected = this.amISelected(id);
    if(amISelected) {this.removeFromSelectedItemsIds(id)}
    else {this.addIdInSelecedItemsIds(id)}
  }

  public amISelected = (id:string) => {return this.selectedItemsIds.includes(id);}

  private removeFromSelectedItemsIds = (id:string) => {
    this.selectedItemsIds = this.selectedItemsIds.filter( selectedId => {
      const idClickedisSelected = selectedId === id;
      return !idClickedisSelected;
    });
  }

  private addIdInSelecedItemsIds = (id:string) => {this.selectedItemsIds.push(id);}

  private handleAddEvent = ():void => {
    //TODO tratar evento de adicionar item
    this.addEvent.emit();
  }

  private handleUpdateEvent = ():void => {
     //TODO tratar evento de editar item
     const canUpdate = this.verifyIfIsOnlyOneItemSelected();
     if(canUpdate){
       const selectedItem = this.findSelectedItem();
       this.updateEvent.emit(selectedItem);
     }
  }

  private handleDeleteEvent = ():void => {
     //TODO tratar evento de deletar item
     const canRemove = this.verifyIfIsMoreThanOnlyOneItemSelected();
     if(canRemove){
      const itemsIdsToRemove = this.selectedItemsIds;
      this.deleteEvent.emit(itemsIdsToRemove);
      this.clearSelectedIdsList();
    }

  }

  private findSelectedItem = () => {
    const index = this.items.findIndex(item => {return (this.selectedItemsIds.toString() === item.id.toString())});
    return this.items[index];
  }

  private verifyIfIsOnlyOneItemSelected = () => {
    const isOnlyOneSelected = this.selectedItemsIds.length === 1;
    if(isOnlyOneSelected) {return true;}
    else {
      this.erMessagesSnackbar.openSnackBar(this.messages.oneItemHasToBeSelected,"warning");
      return false;
    }
  }

  private verifyIfIsMoreThanOnlyOneItemSelected = () => {
    const isMoreThanOnlyOneItemSelected = this.selectedItemsIds.length > 0;
    if(isMoreThanOnlyOneItemSelected) {
      return true;
    }
    else {
      this.erMessagesSnackbar.openSnackBar(this.messages.isNecessaryHaveOneOrMoreItemsSelected,"warning");
      return false;
    }
  }

  private clearSelectedIdsList = () => {
    this.selectedItemsIds = [];
  }
}
