import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[acceptOnlyLettersAndIntNumbers]',
})
export class AcceptOnlyLettersAndIntNumbers {
    constructor(private elementReceived: ElementRef) {
        console.log('instanciei diretiva AcceptOnlyLettersAndIntNumbers');
    }

    @HostListener('input', ['$event']) onEvent() {
        //This directive aceppt letters, int numbers and white space

        console.log('iniciando diretiva phone numbers');
        const dataFromInput = this.elementReceived.nativeElement.value;
        const acceptOnlyAdrresCharsPattern = /[^a-zA-Z0-9\s]/g;
        const replacedData = dataFromInput.replace(acceptOnlyAdrresCharsPattern, '');

        this.elementReceived.nativeElement.value = replacedData;
    }
}
