import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
    selector: 'type-check-header-menu',
    templateUrl: './type-check-header-menu.component.html',
    styleUrls: ['./type-check-header-menu.component.scss'],
})
export class TypeChekHeaderMenu {
    public tableDefaultQuantity: number = 45;
    public individualCheckDefaultQuantity: number = 45;

    public nameFilterText: string = '';
    public numberFilterText: number | undefined;

    @Input() public tableManagement: boolean = true;
    @Input() public hasTableActive: boolean = false;
    @Input() public hasIndividualCheckActive: boolean = false;
    @Output() public changeViewManagement: EventEmitter<ShowManagementType> = new EventEmitter<ShowManagementType>();

    @Input() public tableQuantity: number = this.tableDefaultQuantity;
    @Output() public tableQuantityChange: EventEmitter<number> = new EventEmitter<number>();

    @Input() public individualCheckQuantity: number = this.individualCheckDefaultQuantity;
    @Output() public individualCheckQuantityChange: EventEmitter<number> = new EventEmitter<number>();

    @Output() public changeFilterText: EventEmitter<ManagementFilterPayload> =
        new EventEmitter<ManagementFilterPayload>();

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

    //TODO
    // tratar o evendo de alteracao no campo de filtro de nome commanda ou mesa
    // quem vai tratar é o pai e mandar para o filho que cuida de colocar a lista de mesas/comandas na tela
    public handleNameFilterTextChange = (text: string): void => {
        const payload = new ManagementFilterPayload(text, undefined);
        this.changeFilterText.emit(payload);
    };

    //TODO
    // tratar o evendo de alteracao no campo do filtro de numero da commanda ou mesa
    // quem vai tratar é o pai e mandar para o filho que cuida de colocar a lista de mesas/comandas na tela
    public handleNumberFilterTextChange = (number: string): void => {
        const payload = new ManagementFilterPayload('', Number(number));
        this.changeFilterText.emit(payload);
    };
}

export class ShowManagementType {
    private _showTable: boolean = false;
    private _showIndividualCheck: boolean = false;

    constructor(showTable: boolean = false, showIndividualCheck = false) {
        this.showTable = showTable;
        this.showIndividualCheck = showIndividualCheck;
    }

    public set showTable(value: boolean) {
        this._showTable = value;
        this._showIndividualCheck = !value;
    }

    public get showTable() {
        return this._showTable;
    }

    public set showIndividualCheck(value: boolean) {
        this._showIndividualCheck = value;
        this._showTable = !value;
    }

    public get showIndividualCheck() {
        return this._showIndividualCheck;
    }
}

export class ManagementFilterPayload {
    private _nameFilterText: string = '';
    private _numberFilterText: number | undefined;

    constructor(nameFilterText: string, numberfilterText: number | undefined) {
        if (nameFilterText !== '') {
            this.nameFilterText = nameFilterText;
        } else {
            this.numberFilterText = numberfilterText;
        }
    }

    public set nameFilterText(value: string) {
        this._nameFilterText = value;
        this._numberFilterText = undefined;
    }

    public get nameFilterText() {
        return this._nameFilterText;
    }

    public set numberFilterText(value: number | undefined) {
        this._numberFilterText = value;
        this._nameFilterText = '';
    }

    public get numberFilterText() {
        return this._numberFilterText;
    }
}
