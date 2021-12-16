import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { ObjectService } from 'src/app/services/object.service';
import { FilterActionModel } from '../../model/er-page-list.model';

@Component({
    selector: 'er-page-list-filter',
    templateUrl: './er-page-list-filter.component.html',
    styleUrls: ['./er-page-list-filter.component.scss'],
})
export class ErPageListFilterComponent {
    public propertiesKeys = [
        { key: 'phoneNumber', value: this.messages.phone },
        { key: 'cpf', value: this.messages.cpf },
        { key: 'name', value: this.messages.name },
        { key: 'address', value: this.messages.address },
        { key: 'type', value: this.messages.type },
        { key: 'email', value: this.messages.email },
        { key: 'unitValue', value: this.messages.unitValue },
        { key: 'cost', value: this.messages.unitCost },
        { key: 'code', value: this.messages.code },
        { key: 'id', value: this.messages.code },
    ];

    @Input() permitFilterById = false;

    @Input() set handleItems(items: Array<any>) {
        this.itemsReceived = items;
        if (!this.propertyTypeHaveBeenInicialized) {
            this.fillFilterableOptions();
        }
    }

    @Output() refreshItems = new EventEmitter<FilterActionModel>();

    public itemsReceived: Array<any> = [];
    public originalItems: Array<any> = [];
    public filterableOptions: Array<string> = [];
    public filterText: string = '';
    public propetyFilterable: string = '';
    public propertyTypeHaveBeenInicialized: boolean = false;

    constructor(private objectService: ObjectService, public messages: MessagesKeys) {}

    public getTextToShow(messageKey?: string) {
        const text = this.propertiesKeys.find((element) => {
            return element.key === messageKey;
        });
        return text?.value;
    }

    public handleFilter = (): void => {
        const isFilterEmpty = this.filterText === '';
        if (isFilterEmpty) {
            const filterAction = new FilterActionModel('empty-filter');
            this.refreshItems.emit(filterAction);
        } else {
            const filterAction = new FilterActionModel('contains-filter', this.propetyFilterable, this.filterText);
            this.refreshItems.emit(filterAction);
        }
    };

    public clearFilter = (): void => {
        this.filterText = '';
        this.handleFilter();
    };

    private fillFilterableOptions = (): void => {
        if (this.itemsReceived[0]) {
            this.filterableOptions = this.objectService.getAllPropertiesNames(this.itemsReceived[0]);
            if (!this.permitFilterById) {
                this.removeIdFromFiterableOptions();
            }
            this.propetyFilterable = this.filterableOptions[0];
            this.propertyTypeHaveBeenInicialized = true;
        }
    };

    private removeIdFromFiterableOptions = (): void => {
        this.filterableOptions = this.filterableOptions.filter((option: string) => {
            return option.toLowerCase() !== 'id';
        });
    };
}
