import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'er-confirm-dialog',
    template: '',
})
export class ErConfirmDialog {

    @Input() public styleToUse: string = 'warn';

    @Input() set open(option: boolean) {
        if (option) {
            this.handleCreateDialog();
        }
    }

    @Output() public openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public onSelectOption: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() public messageDisplayed: string = this.messages.beCarefulWithDecision;

    constructor(public messages: MessagesKeys, private _dialogService: DialogService) {}

    public handleCreateDialog = (): void => {
        const dialogRef = this.createDialog(
            {
                messageDisplayed: this.messageDisplayed,
                styleToUse: this.styleToUse
            }
        );

        dialogRef.afterClosed().subscribe((confirm: boolean) => {
            if (confirm) {
                this.onSelectOption.emit(true);
            } else {
                this.onSelectOption.emit(false);
            }
            this.openChange.emit(false);
        });
    };

    private createDialog = (dialogData?: any): any => {
        const height = '250px';
        const width = '600px';

        if (dialogData) {
            const dialogRef = this._dialogService.createDialog(ConfirmDialog, height, width, dialogData);
            return dialogRef;
        } else {
            const dialogRef = this._dialogService.createDialog(ConfirmDialog, height, width);
            return dialogRef;
        }
    };
}
