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
