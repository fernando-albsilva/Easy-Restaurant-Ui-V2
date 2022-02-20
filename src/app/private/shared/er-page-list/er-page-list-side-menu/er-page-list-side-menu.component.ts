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
        const persistenceType = this.createPersistenceTypeModel();
        persistenceType.Add = true;
        this.actionEvent.emit(persistenceType);
    }
    public emitEditEvent() {
        const persistenceType = this.createPersistenceTypeModel();
        persistenceType.Edit = true;
        this.actionEvent.emit(persistenceType);
    }
    public emitDeleteEvent() {
        const persistenceType = this.createPersistenceTypeModel();
        persistenceType.Delete = true;
        this.actionEvent.emit(persistenceType);
    }
   
    public emitDetailEvent() {
        const persistenceType = this.createPersistenceTypeModel();
        persistenceType.Detail = true;
        this.actionEvent.emit(persistenceType);
    }

    public isThisButtonPermited = (type: string): boolean => {
        return this.buttonsPermited.some((element) => {
            return element === type;
        });
    };

    private createPersistenceTypeModel = (): PersistenceTypeModel => {
        return new PersistenceTypeModel();
    }
}
