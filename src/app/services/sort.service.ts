import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortService {


  constructor () {}

  public sortListByObjectPropertyCaseSensitive = (listToSort:Array<any>, propertyChosen: string):Array<any> => {
    return listToSort.sort((element,elementToCompare)=>{
      const isCaseSensitive = true;
      return this.compareObjects(element, elementToCompare, propertyChosen, isCaseSensitive)
    });
  }

  public sortListByObjectPropertyCaseInsensitive = (listToSort:Array<any>, propertyChosen: string):Array<any> => {
    return listToSort.sort((element,elementToCompare)=>{
      const isCaseSensitive = false;
      return this.compareObjects(element, elementToCompare, propertyChosen, isCaseSensitive)
    });
  }

  public sortNumberList = (listToSort:Array<any>):Array<any> => {
    return this.SortByCaseInsensitive(listToSort);
  }

  public sortStringListCaseSensitive = (listToSort:Array<any>):Array<any> => {
    const isCaseSensitive = true;
    return this.sortStringList(listToSort,isCaseSensitive);
  }

  public sortStringListCaseInsensitive = (listToSort:Array<any>):Array<any> => {
    const isCaseSensitive = false;
    return this.sortStringList(listToSort,isCaseSensitive);
  }

  private sortStringList = (listToSort:Array<any>, isCaseSensitive: boolean):Array<any> => {
    if(isCaseSensitive) {return this.SortByCaseSensitive(listToSort);}
    else {return this.SortByCaseInsensitive(listToSort);}
  }

  private SortByCaseSensitive = (listToSort:Array<any>) => {
    return listToSort.sort((element,elementToCompare) => {
      if (element.toUpperCase() > elementToCompare.toUpperCase()) {return 1}
      if (element.toUpperCase() < elementToCompare.toUpperCase()) {return -1}
      return 0;
    });
  }

  private SortByCaseInsensitive = (listToSort:Array<any>) => {
    return listToSort.sort((element,elementToCompare) => {
      if (element > elementToCompare) {return 1}
      if (element < elementToCompare) {return -1}
      return 0;
    });
  }

  private  compareObjects = (object: any, objectToCompare: any, propertyChosen: string,isCaseSensitive: boolean = false) => {
    if(isCaseSensitive){
      const obj = object[propertyChosen].toUpperCase();
      const objToCompare = objectToCompare[propertyChosen].toUpperCase();

      return this.compareDynamicProperties(obj,objToCompare);
    }
    else{
      const obj = object[propertyChosen];
      const objToCompare = objectToCompare[propertyChosen];

      return this.compareDynamicProperties(obj,objToCompare);
    }
  }

  private compareDynamicProperties = (object: any, objectToCompare: any) => {
    if (object < objectToCompare) {return -1}
    if (object > objectToCompare) {return 1}
    return 0
  }
}



