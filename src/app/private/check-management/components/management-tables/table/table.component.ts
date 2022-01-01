import { Component, Input } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { TableModel } from '../../../model/check-management.model';

@Component({
    selector: 'table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    @Input() table: TableModel = new TableModel();

    constructor(public messages: MessagesKeys) {}
}
