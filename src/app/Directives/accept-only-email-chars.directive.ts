import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[acceptOnlyEmailChars]',
})
export class AcceptOnlyEmailChars {
    constructor(private elementReceived: ElementRef) {
        console.log('instanciei diretiva AcceptOnlyEmailChars');
    }

    @HostListener('input', ['$event']) onEvent() {
        //This directive aceppt letters, numbers and chars '.' , '@' , white space is not allowed

        console.log('iniciando diretiva phone numbers');
        const dataFromInput = this.elementReceived.nativeElement.value;
        const acceptOnlyEmailCharsPattern = /[^a-zA-Z0-9@.]/g;
        const replacedData = dataFromInput.replace(acceptOnlyEmailCharsPattern, '');

        this.elementReceived.nativeElement.value = replacedData;
    }
}
