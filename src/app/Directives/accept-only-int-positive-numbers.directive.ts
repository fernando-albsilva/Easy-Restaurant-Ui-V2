import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[acceptOnlyIntPositiveNumbers]',
})
export class AcceptOnlyIntPositiveNumbersDirective {
    constructor(private _elementReceived: ElementRef) {}

    @HostListener('keydown', ['$event']) onKeyboardEvent(event: KeyboardEvent) {
        if (this.mustPreventThisKeyFromInput(event.key)) {
            event.preventDefault();
        }
    }

    @HostListener('change', ['$event']) onInputEvent() {
        const pattern = /[^0-9]/g;
        const minRange = this.getMinRange();
        const maxRange = this.getMaxRange();
        const dataFromInput = this._elementReceived.nativeElement.value;
        const replacedData = dataFromInput.replace(pattern, '');

        if (replacedData === '') {
            this._elementReceived.nativeElement.value = replacedData;
        } else if (minRange && Number(replacedData) < minRange) {
            this._elementReceived.nativeElement.value = minRange;
        } else if (maxRange && Number(replacedData) > maxRange) {
            this._elementReceived.nativeElement.value = maxRange;
        } else if (Number(replacedData) > Number.MAX_SAFE_INTEGER) {
            this._elementReceived.nativeElement.value = Number.MAX_SAFE_INTEGER;
        } else {
            this._elementReceived.nativeElement.value = replacedData;
        }
    }

    private getMinRange = (): Number | undefined => {
        return this._elementReceived.nativeElement.min ? Number(this._elementReceived.nativeElement.min) : undefined;
    };

    private getMaxRange = (): Number | undefined => {
        return this._elementReceived.nativeElement.max ? Number(this._elementReceived.nativeElement.max) : undefined;
    };

    private mustPreventThisKeyFromInput = (key: string): boolean => {
        const invalidChars = ['-', '+', 'e', 'E'];
        return invalidChars.includes(key);
    };
}
