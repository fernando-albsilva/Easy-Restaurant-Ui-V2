import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { CheckManagementHelper } from '../../check-management.helper';
import { CheckResult, TableModel } from '../../model/check-management.model';
import { EditTableDialog } from './edit-table-dialog/edit-table-dialog.component';

@Component({
    selector: 'management-tables',
    templateUrl: './management-tables.component.html',
    styleUrls: ['./management-tables.component.scss'],
})
export class ManagementTablesComponent {

    @Input() tables: Array<TableModel> = [];
    @Input() set numberToFilter(numberToFilter: number | undefined) {
        this.filterTableByNumber(numberToFilter);
    }

    @Output() checkResult = new EventEmitter<CheckResult>();

    
    private checkHelper = new CheckManagementHelper()
    private _numberToFilter: number | undefined;

    constructor(public messages: MessagesKeys, private _dialogService: DialogService) {}

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

    public resetTablesFilter = (): void => {
        this.tables.forEach((table) => {
            table.shouldHideByFilter = false;
        });
    };

    public editTable = (tableNumber: number): void => {
        const dialogRef = this.createDialog(this.tables[tableNumber - 1]);

        dialogRef.afterClosed().subscribe((response: CheckResult) => {
            this.checkResult.emit(response);
        });
    };

    private createDialog = (dialogData?: TableModel) => {
        const height = '95vh';
        const width = '95vw';

        if (dialogData) {
            const dialogRef = this._dialogService.createDialog(EditTableDialog, height, width, dialogData);
            return dialogRef;
        } else {
            const dialogRef = this._dialogService.createDialog(EditTableDialog, height, width);
            return dialogRef;
        }
    };
}
