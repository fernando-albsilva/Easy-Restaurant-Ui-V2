import { Component } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
    selector: 'er-top-menu',
    templateUrl: 'er-top-menu.component.html',
    styleUrls: ['er-top-menu.component.scss'],
})
export class ErTopMenu {
    constructor(public messages: MessagesKeys) {}
}
