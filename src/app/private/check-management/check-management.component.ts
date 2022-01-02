import { Component, OnInit } from '@angular/core';
import {
    ManagementFilterPayload,
    ShowManagementType,
} from './components/type-check-header-menu/type-check-header-menu.component';
import { IndividualCheckModel, TableModel } from './model/check-management.model';

@Component({
    selector: 'check-management',
    templateUrl: './check-management.component.html',
    styleUrls: ['./check-management.component.scss'],
})
export class CheckManagementComponent implements OnInit {
    public individualCheckQuantity: number = 45;
    public individualChecks: Array<IndividualCheckModel> = [];
    public showIndividualChecks: boolean = false;

    //Related to tables
    public tableQuantity: number = 45;
    public tables: Array<TableModel> = [];
    public showTables: boolean = true;

    constructor() {}

    //TODO
    // implementar busca das mesas e contas individuais ativas no banco
    ngOnInit(): void {}

    public handleChangeViewManagement = (show: ShowManagementType): void => {
        this.showIndividualChecks = show.showIndividualCheck;
        this.showTables = show.showTable;
    };

    public handleFilter = (payload: ManagementFilterPayload): void => {
        if (this.showTables) {
            this.filterTables(payload);
        } else if (this.showIndividualChecks) {
            this.filterIndividualChecks(payload);
        }
    };

    //TODO
    //implementar filtro das mesas
    private filterTables = (payload: ManagementFilterPayload): void => {};

    //TODO
    //implementar filtro das comandas
    private filterIndividualChecks = (payload: ManagementFilterPayload): void => {};
}
