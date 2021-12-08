import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  constructor() {}

  public isAnyPropertyEmpty = (objectToVerify: object) => {
    return !Object.values(objectToVerify).every(
      property => property !== null || property !== '' || property !== undefined,
    );
  };
}
