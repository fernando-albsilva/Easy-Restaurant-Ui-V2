import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { PersistenceTypeModel } from '../model/er-page-list.model';

@Component({
    selector: 'er-page-list-side-menu',
    templateUrl: 'er-page-list-side-menu.component.html',
    styleUrls: ['er-page-list-side-menu.component.scss'],
})
export class ErPageListSideMenuComponent {
    @Input() buttonsPermited: Array<string> = ['add', 'edit', 'delete'];

    @Output() actionEvent = new EventEmitter<PersistenceTypeModel>();

    constructor(public messages: MessagesKeys) {}

    public emitAddEvent() {
        const persistenceType = new PersistenceTypeModel();
        persistenceType.Add = true;
        this.actionEvent.emit(persistenceType);
    }
    public emitEditEvent() {
        const persistenceType = new PersistenceTypeModel();
        persistenceType.Edit = true;
        this.actionEvent.emit(persistenceType);
    }
    public emitDeleteEvent() {
        const persistenceType = new PersistenceTypeModel();
        persistenceType.Delete = true;
        this.actionEvent.emit(persistenceType);
    }

    public isThisButtonPermited = (type: string): boolean => {
        for (let button of this.buttonsPermited) {
            if (type === button) {
                return true;
            }
        }
        return false;
    };
}
