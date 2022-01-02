import { Component, Input } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { TableModel } from '../../model/check-management.model';

@Component({
    selector: 'management-tables',
    templateUrl: './management-tables.component.html',
    styleUrls: ['./management-tables.component.scss'],
})
export class ManagementTablesComponent {
    @Input() set tableQuantity(value: number) {
        this.handleTablesQuantity(value);
    }
    @Input() tables: Array<TableModel> = [];

    constructor(public messages: MessagesKeys) {}

    private handleTablesQuantity(value: number) {
        this.tables = [];
        for (let index = 1; index <= value; index++) {
            let table = new TableModel(index);
            this.tables.push(table);
        }
    }
}
