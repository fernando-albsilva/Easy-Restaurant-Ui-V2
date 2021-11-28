import { FunctionModel } from './../../../../../private/worker-function/Model/FunctionModel';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'function-card',
  templateUrl: 'function-card.component.html',
  styleUrls: ['function-card.component.scss','../styles/shared-card-style.scss']
})
export class FunctionCardComponent {

  @Input() set item(workerFunction:FunctionModel){
    this.workerFunction = workerFunction;
  }

  @Input() selected = false;

  public workerFunction: FunctionModel = new FunctionModel();

  constructor () {}
}
