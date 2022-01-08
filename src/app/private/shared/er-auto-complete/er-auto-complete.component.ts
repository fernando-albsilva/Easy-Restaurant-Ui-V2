import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'er-auto-complete',
    templateUrl: 'er-auto-complete.component.html',
    styleUrls: ['er-auto-complete.component.scss'],
})
export class ErAutoComplete {
    public itemsReceived: Array<any> = [];
    public itemsFiltered: Array<any> = [];
    public filterText: string = '';

    @Input() label: string = '';
    @Input() propertyToshowInOption: string = '';
    @Input() set items(items: any) {
        this.itemsReceived = [...items];
        this.itemsFiltered = [...items];
    }

    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();

    constructor() {}

    public handleFilter = (text: string): void => {
        // console.log('valor recebido');
        // console.log(text);
        this.itemsFiltered = this.itemsReceived.filter((element) => {
            const valueToFilter = element[this.propertyToshowInOption];
            if (!valueToFilter) {
                throw new Error(
                    'this property you are trying to filter in autocomplete does not exit or is undefined.',
                );
            } else {
                return valueToFilter.toLowerCase().includes(text.toLocaleLowerCase());
            }
        });
    };

    public handleValueChosen = (item: any) => {
        // console.log("emitindo item");
        // console.log(item);
        this.valueChange.emit(item);
        const valueToShow = item[this.propertyToshowInOption];
        if (!valueToShow) {
            throw new Error(
                'Was not possible to put de text chosen in input because property is undefined or does not exist.',
            );
        } else {
            this.filterText = valueToShow;
        }
    };

    public getPropertyToShowValue = (item: any): string => {
        const valueToShow = item[this.propertyToshowInOption];
        if (!valueToShow) {
            throw new Error('Property you are trying to acess, not exist in this object in autocomplete.');
        } else {
            return valueToShow;
        }
    };
}
