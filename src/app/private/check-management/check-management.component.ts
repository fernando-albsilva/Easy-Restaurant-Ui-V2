import { Component, OnInit } from '@angular/core';
import { ShowManagementType } from './components/type-check-header-menu/type-check-header-menu.component';

@Component({
    selector: 'check-management',
    templateUrl: './check-management.component.html',
    styleUrls: ['./check-management.component.scss'],
})
export class CheckManagementComponent implements OnInit {
    public tableQuantity: number = 50;
    public individualCheckQuantity: number = 80;
    public showTables: boolean = true;
    public showIndividualChecks: boolean = false;

    constructor() {}
    ngOnInit(): void {}

    public handleChangeViewManagement = (show: ShowManagementType): void => {
        if (show.showTable) {
            this.showIndividualChecks = false;
            this.showTables = true;
        } else if (show.showIndividualCheck) {
            this.showTables = false;
            this.showIndividualChecks = true;
        }
    };
}
