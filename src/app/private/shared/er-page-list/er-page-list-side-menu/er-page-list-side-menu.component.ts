import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
    selector: 'er-page-list-side-menu',
    templateUrl: 'er-page-list-side-menu.component.html',
    styleUrls: ['er-page-list-side-menu.component.scss'],
})
export class ErPageListSideMenu {
    @Input() buttonsPermited: Array<string> = ['add', 'edit', 'delete'];

    @Output() actionEvent = new EventEmitter<string>();

    constructor(public messages: MessagesKeys) {}

    public emitAddEvent() {
        this.actionEvent.emit('add');
    }
    public emitEditEvent() {
        this.actionEvent.emit('edit');
    }
    public emitDeleteEvent() {
        this.actionEvent.emit('delete');
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
