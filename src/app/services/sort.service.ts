import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortService {


  constructor () {}

  public sortListByObjectProperty = (listToSort:Array<any>, propoertyChossen: string):Array<any> => {
    return listToSort.sort((element,elementToCompare)=>{
      return this.compareObjects(element, elementToCompare, propoertyChossen)
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

  private  compareObjects = (object1:any, object2:any, propoertyChossen:string) => {
    const obj1 = object1[propoertyChossen].toUpperCase();
    const obj2 = object2[propoertyChossen].toUpperCase();

    if (obj1 < obj2) {return -1}
    if (obj1 > obj2) {return 1}
    return 0
  }
}



