import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { CheckResult, IndividualCheckModel, TableModel } from '../../model/check-management.model';
import { EditTableDialog } from '../edit-table-dialog/edit-table-dialog.component';

@Component({
    selector: 'management-individual-checks',
    templateUrl: './management-individual-checks.component.html',
    styleUrls: ['./management-individual-checks.component.scss'],
})
export class ManagementIndividualChecksComponent {

    @Input() individualChecks: Array<IndividualCheckModel> = [];
    @Input() set numberToFilter(numberToFilter: number | undefined) {
        this.filterIndividualCheckByNumber(numberToFilter);
    }
    @Input() set nameToFilter(nameToFilter: string | undefined) {
        this.filterIndividualCheckByName(nameToFilter);
    }

    @Output() checkResult = new EventEmitter<CheckResult>();

    constructor(public messages: MessagesKeys, private _dialogService: DialogService) {}

    private filterIndividualCheckByNumber = (individualCheckNumber: number | undefined): void => {
        this.individualChecks = this.individualChecks.map((table) => {
            if (individualCheckNumber !== undefined) {
                const individualCheckHasFilterNumber = table.number.toString().includes(individualCheckNumber.toString());
                if (individualCheckHasFilterNumber) {
                    table.shouldHideByFilter = false;
                } else {
                    table.shouldHideByFilter = true;
                }
            }
            return table;
        });
    };

    public resetIndivdualChecksFilter = (): void => {
        this.individualChecks.forEach((individualCheck) => {
            individualCheck.shouldHideByFilter = false;
        });
    };

    public editIndividualCheck = (individualCheckNumber: number): void => {
        const dialogRef = this.createDialog(this.individualChecks[individualCheckNumber - 1]);

        dialogRef.afterClosed().subscribe((response: CheckResult) => {
            this.checkResult.emit(response);
        });
    };

    private filterIndividualCheckByName = (nameToFilter: string | undefined): void => {
        this.individualChecks = this.individualChecks.map((individualCheck) => {
            if (nameToFilter !== undefined) {
                const individualCheckHasFilterName =
                individualCheck.clientName.toString().includes(nameToFilter.toString());
                if (individualCheckHasFilterName) {
                    individualCheck.shouldHideByFilter = false;
                } else {
                    individualCheck.shouldHideByFilter = true;
                }
            }
            return individualCheck;
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
