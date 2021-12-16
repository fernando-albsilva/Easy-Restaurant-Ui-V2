export class PersistenceTypeModel {
    private add: boolean = false;
    private edit: boolean = false;
    private delete: boolean = false;

    set Add(option: boolean) {
        this.add = option;
        if (this.Edit || this.Delete) {
            this.forceOnlyOneTypeToBeTrue('add');
        }
    }
    get Add() {
        return this.add;
    }

    set Edit(option: boolean) {
        this.edit = option;
        if (this.Add || this.Delete) {
            this.forceOnlyOneTypeToBeTrue('edit');
        }
    }

    get Edit() {
        return this.edit;
    }

    set Delete(option: boolean) {
        this.delete = option;
        if (this.Add || this.Edit) {
            this.forceOnlyOneTypeToBeTrue('delete');
        }
    }

    get Delete() {
        return this.delete;
    }

    public forceOnlyOneTypeToBeTrue = (trueValue: string): void => {
        if (trueValue === 'add') {
            this.Edit = false;
            this.Delete = false;
        } else if (trueValue === 'edit') {
            this.Add = false;
            this.Delete = false;
        } else if (trueValue === 'delete') {
            this.Add = false;
            this.Edit = false;
        }
    };
}

export class FilterActionModel {
    public state: string = '';
    public propertyToFilter: string = '';
    public filterInput: string = '';

    constructor(state: string, propertyToFilter?: string, filterInput?: string) {
        this.state = state;
        this.propertyToFilter = propertyToFilter ? propertyToFilter : '';
        this.filterInput = filterInput ? filterInput : '';
    }
}
