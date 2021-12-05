import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortService {


  constructor () {}


  public sortList = (listToSort:Array<any>):Array<any> =>{
    return listToSort.sort((element,elementToCompare)=>{
      if (element > element) {return 1}
      if (element < element) {return -1}
      return 0;
    });
  }

  public sortListByObjectProperty = (listToSort:Array<any>, propoertyChossen: string):Array<any> =>{
    return listToSort.sort((element,elementToCompare)=>{
      return this.compareObjects(element, elementToCompare, propoertyChossen)
    });
  }

  private  compareObjects(object1:any, object2:any, propoertyChossen:string){
    const obj1 = object1[propoertyChossen].toUpperCase();
    const obj2 = object2[propoertyChossen].toUpperCase();

    if (obj1 < obj2) {return -1}
    if (obj1 > obj2) {return 1}
    return 0
  }
}



