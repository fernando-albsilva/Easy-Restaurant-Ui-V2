import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { SortService } from 'src/app/services/sort.service';
import { CheckManagementApi } from './api/check-management.api';
import { CheckManagementHelper } from './check-management.helper';
import { InvoiceActiveCommand } from './commands/check-management.command';
import { ManagementTablesComponent } from './components/management-tables/management-tables.component';
import {
    ManagementFilterPayload,
    ShowManagementType,
} from './components/type-check-header-menu/type-check-header-menu.component';
import { ActiveTable, CheckResult, IndividualCheckModel, TableModel } from './model/check-management.model';

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
    @Input() public tableNumberToFilter: number | undefined;
    @ViewChild('managementTablesRef') managementTablesRef: ManagementTablesComponent | undefined;

    private checkHelper = new CheckManagementHelper();

    constructor(
        private _erMessagesSnackbar: ErMessages,
        private _messages: MessagesKeys,
        private _sortService: SortService,
        private _checkManagementApi: CheckManagementApi,
        private _auth: AuthService
    ) {}

    //TODO
    // implementar busca das mesas e contas individuais ativas no banco
    ngOnInit(): void {
        this.handleTablesQuantity();
        this.getActivesTablesAndIndividualChecks();
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
            this._erMessagesSnackbar.openSnackBar(this._messages.checkClosedSucessfully, 'sucess');
        } else if (checkResult.checkOptions.active) {
            this.handleTableActive(checkResult.table);
        }
    };

    //TODO
    //INFO
    // Ao ser fechada a conta esse metodo deve tratar
    // de gerar a conta final (Não implementado ainda)
    // salvar na tabela de invoice corretamente (Não implementado ainda);
    // limpar a mesa (Já implementado);

        //BMFERNANDO  implementando conclusao de mesa no backend
    private handleClosedTableCheck = (table: TableModel): void => {
        this._checkManagementApi
            .closeCheck(table.invoiceId)
            .subscribe(
                ()=>{},
                (err)=>{ console.error(err);}
            );
        const tableIndex = this.checkHelper.findTableIndexByNumber(this.tables, table.number);
        if (tableIndex) {
            this.tables[tableIndex] = new TableModel();
            this.tables[tableIndex].number = table.number;
            this.tables = [...this.tables];
        } else {
            throw new Error('Can not clear table after finish because it was not found in table list');
        }
    };

    //TODO
    //INFO
    //Ao ser fechado o dialogo de edição com uma mesa ainda ativa
    //Essa mesa deve ser tratada e feito o update da mesma na lista de mesas this.tables
    private handleTableActive = (table: TableModel) => {
        const tableIndex = this.checkHelper.findTableIndexByNumber(this.tables, table.number);
        if (tableIndex) {
            this.tables[tableIndex] = table;
        } else {
            this.tables.push(table);
        }
        if (this.tables.length > 0) {
            this.tables = this._sortService.sortByProperty(this.tables, 'number');
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

    private getActivesTablesAndIndividualChecks = (): void => {
        this._checkManagementApi.getActiveTablesAndIndividualChecksNumber().subscribe(
            (result) => {
                this.tagActiveChecks(result);
            },
            (err) => {
                console.log(err);
            }
        );
    };

    //TODO fazer com as comandas tambem
    private tagActiveChecks = (activeChecks: Array<ActiveTable>): void => {
        let activeTables: Array<ActiveTable> = [];
        let individualChecks: Array<ActiveTable> = [];

        activeChecks.forEach((element) => {
            if (element.tableNumber) {
                activeTables.push(element);
            } else {
                individualChecks.push(element); //implementar aqui os numberos das comandas
            }
        });

        this.fillActiveTablesBasicInfo(activeTables);

        //TODO fazer igual o foreeach acima para comanda
    };

    private fillActiveTablesBasicInfo = (activeTables: Array<ActiveTable>): void => {
        this.tables.forEach((table) => {
            const activeTable = activeTables.find((activeTable) => {
                return activeTable.tableNumber === table.number;
            });

            if (activeTable) {
                table.isActive = true;
                table.invoiceId = activeTable.id;
            }
        });
    };
}
