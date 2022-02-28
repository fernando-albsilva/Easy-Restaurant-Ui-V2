import { Component, Input } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { IndividualCheckModel } from '../../../model/check-management.model';

@Component({
    selector: 'individual-check',
    templateUrl: './individual-check.component.html',
    styleUrls: ['./individual-check.component.scss'],
})
export class IndividualCheckComponent {
    @Input() individualCheck: IndividualCheckModel = new IndividualCheckModel();

    constructor(public messages: MessagesKeys) {}
}
