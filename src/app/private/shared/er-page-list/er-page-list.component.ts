import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { PersistenceTypeModel } from './model/er-page-list.model';

@Component({
    selector: 'er-page-list',
    templateUrl: 'er-page-list.component.html',
    styleUrls: ['er-page-list.component.scss'],
})
export class ErPageList {
    @Input() set items(itemsReceived: Array<any>) {
        this.itemsReceived = itemsReceived;
        this.itemsFiltred = [...this.itemsReceived];
    }
    public itemsReceived: Array<any> = [];
    public itemsFiltred: Array<any> = [];

    @Input() context: string = '';
    @Input() buttonsPermited: Array<string> = ['add', 'edit', 'delete'];

    @Output() addEvent = new EventEmitter<string>();
    @Output() updateEvent = new EventEmitter<string>();
    @Output() deleteEvent = new EventEmitter<Array<string>>();

    public selectedItemsIds: Array<string> = [];

    constructor(private erMessagesSnackbar: ErMessages, private messages: MessagesKeys) {}

    public handleSideMenuAction(type: PersistenceTypeModel) {
        if (type.Add) {
            this.handleAddEvent();
        } else if (type.Edit) {
            this.handleUpdateEvent();
        } else if (type.Delete) {
            this.handleDeleteEvent();
        }
        // switch (type) {
        //     case 'add':
        //         this.handleAddEvent();
        //         break;

        //     case 'edit':
        //         this.handleUpdateEvent();
        //         break;

        //     case 'delete':
        //         this.handleDeleteEvent();
        //         break;

        //     default:
        //         break;
        // }
    }

    public refreshItems = (action: any): void => {
        const isItemsReceivedEmpty = action.state === 'empty-filter';
        if (isItemsReceivedEmpty) {
            this.restoreItemsList();
        } else {
            this.executefilter(action);
        }
    };

    private executefilter = (action: any) => {
        this.itemsFiltred = this.itemsReceived.filter((item) => {
            const elementToFilter = this.getItemPropertyValueToFilter(action, item);
            const inputFilter = action.filterInput.toLowerCase();

            if (elementToFilter) {
                return elementToFilter.includes(inputFilter);
            }
            return true;
        });
    };

    private getItemPropertyValueToFilter = (action: any, item: any): string => {
        const typeOfItem = typeof item[action.propertyToFilter];
        if (typeOfItem === 'number') {
            return item[action.propertyToFilter].toString().toLowerCase();
        } else {
            return item[action.propertyToFilter].toLowerCase();
        }
    };

    private restoreItemsList = (): void => {
        this.itemsFiltred = [];
        this.itemsFiltred = [...this.itemsReceived];
    };

    public isContext = (type: string) => {
        return type === this.context;
    };

    public selectOrRemoveCardSelection = (id: string) => {
        const amISelected = this.amISelected(id);
        if (amISelected) {
            this.removeFromSelectedItemsIds(id);
        } else {
            this.addIdInSelecedItemsIds(id);
        }
    };

    public amISelected = (id: string) => {
        return this.selectedItemsIds.includes(id);
    };

    private removeFromSelectedItemsIds = (id: string) => {
        this.selectedItemsIds = this.selectedItemsIds.filter((selectedId) => {
            const idClickedisSelected = selectedId === id;
            return !idClickedisSelected;
        });
    };

    private addIdInSelecedItemsIds = (id: string) => {
        this.selectedItemsIds.push(id);
    };

    private handleAddEvent = (): void => {
        this.addEvent.emit();
    };

    private handleUpdateEvent = (): void => {
        const canUpdate = this.verifyIfIsOnlyOneItemSelected();
        if (canUpdate) {
            const selectedItem = this.findSelectedItem();
            this.updateEvent.emit(selectedItem);
        }
    };

    private handleDeleteEvent = (): void => {
        const canRemove = this.verifyIfIsMoreThanOnlyOneItemSelected();
        if (canRemove) {
            const itemsIdsToRemove = this.selectedItemsIds;
            this.deleteEvent.emit(itemsIdsToRemove);
            this.clearSelectedIdsList();
        }
    };

    private findSelectedItem = () => {
        const index = this.itemsReceived.findIndex((item) => {
            return this.selectedItemsIds.toString() === item.id.toString();
        });
        return this.itemsReceived[index];
    };

    private verifyIfIsOnlyOneItemSelected = () => {
        const isOnlyOneSelected = this.selectedItemsIds.length === 1;
        if (isOnlyOneSelected) {
            return true;
        } else {
            this.erMessagesSnackbar.openSnackBar(this.messages.oneItemHasToBeSelected, 'warning');
            return false;
        }
    };

    private verifyIfIsMoreThanOnlyOneItemSelected = () => {
        const isMoreThanOnlyOneItemSelected = this.selectedItemsIds.length > 0;
        if (isMoreThanOnlyOneItemSelected) {
            return true;
        } else {
            this.erMessagesSnackbar.openSnackBar(this.messages.isNecessaryHaveOneOrMoreItemsSelected, 'warning');
            return false;
        }
    };

    private clearSelectedIdsList = () => {
        this.selectedItemsIds = [];
    };
}