import { NgModule } from '@angular/core';
import { AcceptOnlyAddressChars } from './accept-only-address-chars.directive';
import { AcceptOnlyEmailChars } from './accept-only-email-chars.directive';
import { AcceptOnlyIntPositiveNumbersDirective } from './accept-only-int-positive-numbers.directive';

import { AcceptOnlyLettersAndIntNumbers } from './accept-only-letters-and-int-numbers.directive';
import { AcceptOnlyLetterDirective } from './accept-only-letters.directive';
import { AcceptOnlyPhoneNumbers } from './accept-only-phone-numbers.directive';

@NgModule({
    imports: [],
    declarations: [
        AcceptOnlyLetterDirective,
        AcceptOnlyIntPositiveNumbersDirective,
        AcceptOnlyPhoneNumbers,
        AcceptOnlyEmailChars,
        AcceptOnlyAddressChars,
        AcceptOnlyLettersAndIntNumbers,
    ],
    exports: [
        AcceptOnlyLetterDirective,
        AcceptOnlyIntPositiveNumbersDirective,
        AcceptOnlyPhoneNumbers,
        AcceptOnlyEmailChars,
        AcceptOnlyAddressChars,
        AcceptOnlyLettersAndIntNumbers,
    ],
})
export class DirectivesModule {}
