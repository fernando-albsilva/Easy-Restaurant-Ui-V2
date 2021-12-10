import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[acceptOnlyIntPositiveNumbers]',
})
export class AcceptOnlyIntPositiveNumbers {
    constructor(private elementReceived: ElementRef) {
        console.log('instanciei diretiva AcceptOnlyIntPositiveNumbers');
    }

    @HostListener('input', ['$event']) onEvent() {
        //accept only positve numbers, white space is not allowed

        const dataFromInput = this.elementReceived.nativeElement.value;
        const acceptOnlyIntPositiveNumbersPattern = /[^0-9]/g;
        const replacedData = dataFromInput.replace(acceptOnlyIntPositiveNumbersPattern, '');

        this.elementReceived.nativeElement.value = replacedData;
    }
}
