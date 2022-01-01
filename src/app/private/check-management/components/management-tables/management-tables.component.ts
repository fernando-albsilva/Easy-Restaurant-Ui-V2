import { Component, Input } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { TableModel } from '../../model/check-management.model';

@Component({
    selector: 'management-tables',
    templateUrl: './management-tables.component.html',
    styleUrls: ['./management-tables.component.scss'],
})
export class ManagementTablesComponent {
    @Input() tables: Array<TableModel> = [];

    constructor(public messages: MessagesKeys) {
        for (let index = 0; index < 60; index++) {
            let table = new TableModel();
            this.tables.push(table);
        }
    }
}
