import { Component, OnInit } from '@angular/core';
import { MessagesKeys } from 'src/app/services/messages-keys.service';

@Component({
    selector: 'type-check-menu',
    templateUrl: './type-check-menu.component.html',
    styleUrls: ['./type-check-menu.component.scss'],
})
export class TypeChekMenu implements OnInit {
    constructor(public messages: MessagesKeys) {}
    ngOnInit(): void {}
}
