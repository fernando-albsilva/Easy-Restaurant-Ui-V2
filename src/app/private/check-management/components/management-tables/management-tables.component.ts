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
    @Input() set numberToFilter(numberToFilter: number | undefined) {
        this.filterTableByNumber(numberToFilter);
    }

    private _numberToFilter: number | undefined;

    constructor(public messages: MessagesKeys) {}

    private handleTablesQuantity(value: number) {
        this.tables = [];
        for (let index = 1; index <= value; index++) {
            let table = new TableModel(index);
            this.tables.push(table);
        }
    }

    private filterTableByNumber = (tableNumber: number | undefined): void => {
        this.tables = this.tables.map((table) => {
            if (tableNumber !== undefined) {
                const tableHasFilterNumber = table.number.toString().includes(tableNumber.toString());
                if (tableHasFilterNumber) {
                    table.shouldHideByFilter = false;
                } else {
                    table.shouldHideByFilter = true;
                }
            }
            return table;
        });
    };

    public resetTablesFilter = () => {
        this.tables.forEach((table) => {
            table.shouldHideByFilter = false;
        });
    };
}
