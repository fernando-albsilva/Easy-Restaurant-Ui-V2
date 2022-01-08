import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SortService {
    constructor() {}

    public sortByPropertyCaseSensitive = (listToSort: Array<any>, propertyChosen: string): Array<any> => {
        return listToSort.sort((element, elementToCompare) =>
            this.compareObjectsByProperty(element, elementToCompare, propertyChosen, true),
        );
    };

    public sortByProperty = (listToSort: Array<any>, propertyChosen: string): Array<any> => {
        return listToSort.sort((element, elementToCompare) =>
            this.compareObjectsByProperty(element, elementToCompare, propertyChosen, false),
        );
    };

    public sortByNumber = (listToSort: Array<Number>): Array<Number> => this.sortList(listToSort);

    public sortStringCaseSensitive = (listToSort: Array<string>): Array<string> =>
        this.sortStringList(listToSort, true);

    public sortStringCaseInsensitive = (listToSort: Array<string>): Array<string> =>
        this.sortStringList(listToSort, false);

    private sortStringList = (listToSort: Array<string>, isCaseSensitive: boolean): Array<string> => {
        return isCaseSensitive ? this.sortListCaseSensitive(listToSort) : this.sortList(listToSort);
    };

    private sortListCaseSensitive = (listToSort: Array<any>) => {
        return listToSort.sort((element, elementToCompare) => {
            if (element.toUpperCase() > elementToCompare.toUpperCase()) {
                return 1;
            }
            if (element.toUpperCase() < elementToCompare.toUpperCase()) {
                return -1;
            }
            return 0;
        });
    };

    private sortList = (listToSort: Array<any>) => {
        return listToSort.sort((element, elementToCompare) => {
            if (element > elementToCompare) {
                return 1;
            }
            if (element < elementToCompare) {
                return -1;
            }
            return 0;
        });
    };

    private compareObjectsByProperty = (
        object: any,
        objectToCompare: any,
        propertyChosen: string,
        isCaseSensitive: boolean = false,
    ) => {
        const obj = object[propertyChosen];

        const objToCompare = objectToCompare[propertyChosen];

        if (obj === undefined || objToCompare === undefined) {
            throw Error(`The ${propertyChosen} property not found in object`);
        }

        const filteredObject = isCaseSensitive ? obj.toUpperCase() : obj;

        const filteredObjectToCompare = isCaseSensitive ? objToCompare.toUpperCase() : objToCompare;

        return this.compareDynamicProperties(filteredObject, filteredObjectToCompare);
    };

    private compareDynamicProperties = (object: any, objectToCompare: any) => {
        if (object < objectToCompare) {
            return -1;
        }
        if (object > objectToCompare) {
            return 1;
        }
        return 0;
    };
}
