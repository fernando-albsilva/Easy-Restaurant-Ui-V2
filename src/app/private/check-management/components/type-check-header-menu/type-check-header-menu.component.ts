import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { CheckManagementSettingDialogPayload } from '../../model/check-management.model';
import { CheckManagementSettingsDialogComponent } from './check-management-settings-dialog/check-management-settings-dialog.component';
import { ManagementFilterPayload, ShowManagementType } from './type-check-header-menu.models';

@Component({
    selector: 'type-check-header-menu',
    templateUrl: './type-check-header-menu.component.html',
    styleUrls: ['./type-check-header-menu.component.scss'],
})
export class TypeChekHeaderMenu {
    public tableDefaultQuantity: number = 50;
    public individualCheckDefaultQuantity: number = 50;

    public nameFilterText: string = '';
    public numberFilterText: number | undefined;

    @Input() public tableManagement: boolean = true;
    @Input() public hasTableActive: boolean = false;
    @Input() public hasIndividualCheckActive: boolean = false;
    
    @Output() public changeViewManagement: EventEmitter<ShowManagementType> = 
        new EventEmitter<ShowManagementType>();
    @Output() public changeFilterText: EventEmitter<ManagementFilterPayload> =
        new EventEmitter<ManagementFilterPayload>();

    constructor(
        public messages: MessagesKeys,
        public dialog: MatDialog,
        private dialogService: DialogService,
        private erMessagesSnackbar: ErMessages,
        ) {}

    public handleShowManagementTypeChange = (showTable: boolean, showIndividualCheck: boolean): void => {
        if (showTable) {
            this.changeViewManagement.emit(new ShowManagementType(true, false));
        } else if (showIndividualCheck) {
            this.changeViewManagement.emit(new ShowManagementType(false, true));
        }
    };

    //INFO
    // emite o evento com o texto para filtrar pelo nome do cliente
    public handleNameFilterTextChange = (text: string): void => {
        const payload = new ManagementFilterPayload(text, undefined);
        this.changeFilterText.emit(payload);
    };

    //INFO
    //emite o evento de filtro com o numero da comanda/mesa para ser filtrada
    public handleNumberFilterTextChange = (number: string | undefined): void => {
        const isNumberEmpty = number === undefined || number === '';
        if (isNumberEmpty) {
            const payload = new ManagementFilterPayload('', undefined);
            this.changeFilterText.emit(payload);
        } else {
            const payload = new ManagementFilterPayload('', Number(number));
            this.changeFilterText.emit(payload);
        }
    };

    public openSettingDialog = () => {
        const dialogRef = 
            this.createDialog(
                new CheckManagementSettingDialogPayload(this.hasTableActive, this.hasIndividualCheckActive)
            );

        // dialogRef.afterClosed().subscribe(
        //     (response: DialogCreateUpdatePayloadModel) => {
        //     const canSave = response && response.actionSave;
        //     if (canSave) {
        //         this.handleProductCreation(response.data);
        //     }
        // });
    }

    
    private createDialog = (dialogData?: CheckManagementSettingDialogPayload) => {
        const height = '500px';
        const width = '500px';

        if (dialogData) {
            const dialogRef = this.dialogService.createDialog(CheckManagementSettingsDialogComponent, height, width, dialogData);
            return dialogRef;
        } else {
            const dialogRef = this.dialogService.createDialog(CheckManagementSettingsDialogComponent, height, width);
            return dialogRef;
        }
    };

}