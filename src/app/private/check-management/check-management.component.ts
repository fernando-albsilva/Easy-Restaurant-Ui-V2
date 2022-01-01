import { Component, OnInit } from '@angular/core';
import { ShowManagementType } from './components/type-check-header-menu/type-check-header-menu.component';
import { IndividualCheckModel, TableModel } from './model/check-management.model';

@Component({
    selector: 'check-management',
    templateUrl: './check-management.component.html',
    styleUrls: ['./check-management.component.scss'],
})
export class CheckManagementComponent implements OnInit {
    public individualCheckQuantity: number = 80;
    public individualChecks: Array<IndividualCheckModel> = [];
    public showIndividualChecks: boolean = false;

    //Related to tables
    public tableQuantity: number = 50;
    public tables: Array<TableModel> = [];
    public showTables: boolean = true;

    constructor() {}

    //TODO
    // implementar busca das mesas e contas individuais ativas no banco
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
