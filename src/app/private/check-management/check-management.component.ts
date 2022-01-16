import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { SortService } from 'src/app/services/sort.service';
import { CheckManagementHelper } from './check-management.helper';
import { ManagementTablesComponent } from './components/management-tables/management-tables.component';
import {
    ManagementFilterPayload,
    ShowManagementType,
} from './components/type-check-header-menu/type-check-header-menu.component';
import { CheckResult, IndividualCheckModel, TableModel } from './model/check-management.model';

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
    public tableQuantity: number = 5;
    public tables: Array<TableModel> = [];
    public showTables: boolean = true;
    @Input() public tableNumberToFilter: number | undefined;
    @ViewChild('managementTablesRef') managementTablesRef: ManagementTablesComponent | undefined;

    private checkHelper = new CheckManagementHelper();

    constructor(
        private erMessagesSnackbar: ErMessages,
        private messages: MessagesKeys,
        private sortService: SortService
    ) {}

    //TODO
    // implementar busca das mesas e contas individuais ativas no banco
    ngOnInit(): void {
        this.handleTablesQuantity();
    }

    public handleChangeViewManagement = (show: ShowManagementType): void => {
        this.showIndividualChecks = show.showIndividualCheck;
        this.showTables = show.showTable;
    };

    public handleFilter = (payload: ManagementFilterPayload): void => {
        const isShowingTables = this.showTables;
        if (isShowingTables) {
            this.filterTables(payload);
        } else if (this.showIndividualChecks) {
            this.filterIndividualChecks(payload);
        }
    };

    public handleCheckResult = (checkResult: CheckResult): void => {
        if (checkResult.checkOptions.closed) {
            this.handleClosedTableCheck(checkResult.table);
            this.erMessagesSnackbar.openSnackBar(this.messages.checkClosedSucessfully, 'sucess');
        } else if (checkResult.checkOptions.active) {
            this.handleTableActive(checkResult.table);
        }
    };

    //TODO
    //INFO
    // Ao ser fechada a conta esse metodo deve tratar
    // de gerar a conta final
    // salvar na tabela de invoice corretamente
    // liberar a mesa na lista de mesas this.tables
    private handleClosedTableCheck = (table: TableModel): void => {};

    //TODO
    //INFO
    //Ao ser fechado o dialogo de edição com uma mesa ainda ativa
    //Essa mesa deve ser tratada e feito o update da mesma na lista de mesas this.tables
    private handleTableActive = (table: TableModel) => {
        const tableIndex = this.checkHelper.findTableIndexByNumber(this.tables,table.number);
        if (tableIndex) {
            this.tables[tableIndex] = table;
        } else {
            this.tables.push(table);
        }
        if(this.tables.length > 0){
            this.tables = this.sortService.sortByProperty(this.tables,'number');
        }
    };

    //TODO
    //implementar filtro das mesas
    private filterTables = (payload: ManagementFilterPayload): void => {
        const isFilterByClientName = payload.nameFilterText !== '';
        const isFilterByTableNumber = payload.numberFilterText !== undefined;
        if (!isFilterByTableNumber) {
            this.managementTablesRef?.resetTablesFilter();
        }
        if (isFilterByClientName) {
            this.filterTableByClientName(payload.nameFilterText);
        } else if (isFilterByTableNumber) {
            this.tableNumberToFilter = payload.numberFilterText;
        }
    };

    private filterTableByClientName = (text: string): void => {};

    //TODO
    //implementar filtro das comandas
    private filterIndividualChecks = (payload: ManagementFilterPayload): void => {};

    private handleTablesQuantity() {
        this.tables = [];
        for (let index = 1; index <= this.tableQuantity; index++) {
            let table = new TableModel(index);
            table.number = index;
            this.tables.push(table);
        }
    }
}
