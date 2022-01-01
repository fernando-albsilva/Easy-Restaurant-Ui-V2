import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
    selector: 'type-check-header-menu',
    templateUrl: './type-check-header-menu.component.html',
    styleUrls: ['./type-check-header-menu.component.scss'],
})
export class TypeChekHeaderMenu {
    public tableDefaultQuantity: number = 50;
    public individualCheckDefaultQuantity: number = 80;

    @Input() public tableManagement: boolean = true;
    @Input() public hasTableActive: boolean = false;
    @Input() public hasIndividualCheckActive: boolean = false;
    @Output() public changeViewManagement: EventEmitter<ShowManagementType> = new EventEmitter<ShowManagementType>();

    @Input() public tableQuantity: number = this.tableDefaultQuantity;
    @Output() public tableQuantityChange: EventEmitter<number> = new EventEmitter<number>();

    @Input() public individualCheckQuantity: number = this.individualCheckDefaultQuantity;
    @Output() public individualCheckQuantityChange: EventEmitter<number> = new EventEmitter<number>();

    constructor(public messages: MessagesKeys) {}

    public handleTableQuantityChange = (value: string): void => {
        if (value) {
            this.tableQuantityChange.emit(Number(value));
        }
    };

    public handleIndividualCheckQuantityChange = (value: string): void => {
        if (value) {
            this.individualCheckQuantityChange.emit(Number(value));
        }
    };

    public handleShowManagementTypeChange = (showTable: boolean, showIndividualCheck: boolean): void => {
        if (showTable) {
            this.changeViewManagement.emit(new ShowManagementType(true, false));
        } else if (showIndividualCheck) {
            this.changeViewManagement.emit(new ShowManagementType(false, true));
        }
    };
}

export class ShowManagementType {
    public showTable: boolean = false;
    public showIndividualCheck: boolean = false;

    constructor(showTable: boolean = false, showIndividualCheck = false) {
        this.showTable = showTable;
        this.showIndividualCheck = showIndividualCheck;
    }
}
