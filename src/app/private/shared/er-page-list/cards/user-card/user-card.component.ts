import { Component, Input } from '@angular/core';

import { MessagesKeys } from 'src/app/services/messages-keys.service';

import { UserFlatModel } from 'src/app/private/user/model/auth-user.model';

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
