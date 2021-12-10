import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[acceptOnlyLetters]',
})
export class AcceptOnlyLetterDirective {
    constructor(private elementReceived: ElementRef) {
        console.log('instanciei diretiva AcceptOnlyLetters');
    }

    @HostListener('input', ['$event']) onEvent() {
        // accept letters , white space and chars 'ãõáàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ'

        const dataFromInput = this.elementReceived.nativeElement.value;
        const acceptOnlyLettersPattern = /[^a-zA-Z\sãõáàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]/g;
        const replacedData = dataFromInput.replace(acceptOnlyLettersPattern, '');

        this.elementReceived.nativeElement.value = replacedData;
    }
}
