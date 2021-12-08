import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  constructor() {}

  public isAnyPropertyEmpty = (objectToVerify: object): boolean => {
    return !Object.values(objectToVerify).every(
      property => !(property === null || property === '' || property === undefined),
    );
  };

  public getAllPropertiesNames = (objectToGetPropertiesNames: object): Array<string> => {
    if (objectToGetPropertiesNames) {
      return Object.getOwnPropertyNames(objectToGetPropertiesNames);
    }
    throw new Error('Objeto é null ou undefined ou vazio');
  };
}
