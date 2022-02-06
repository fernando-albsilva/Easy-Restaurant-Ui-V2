import { Component, Input } from '@angular/core';
import { UserFlatModel } from 'src/app/private/user/model/auth-user.model';

import { MessagesKeys } from 'src/app/services/messages-keys.service';



@Component({
    selector: 'user-card',
    templateUrl: 'user-card.component.html',
    styleUrls: ['user-card.component.scss', '../styles/shared-card-style.scss'],
})
export class UserCardComponent {
    @Input() set item(userFlatModel: UserFlatModel) {
        this.userFlatModel = userFlatModel;
    }

    @Input() selected = false;

    public userFlatModel: UserFlatModel = new UserFlatModel();

    constructor(public messages: MessagesKeys) {}
}
