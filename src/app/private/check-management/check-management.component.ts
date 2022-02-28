import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ErMessages } from 'src/app/services/er-messages.service';
import { MessagesKeys } from 'src/app/services/messages-keys.service';
import { SortService } from 'src/app/services/sort.service';
import { CheckManagementApi } from './api/check-management.api';
import { CheckManagementHelper } from './check-management.helper';
import { ManagementIndividualChecksComponent } from './components/management-individual-checks/management-individual-checks.component';
import { ManagementTablesComponent } from './components/management-tables/management-tables.component';
import {
    ManagementFilterPayload,
    ShowManagementType,
} from './components/type-check-header-menu/type-check-header-menu.component';
import { ActiveIndividualCheck, ActiveTable, CheckResult, IndividualCheckModel, TableModel } from './model/check-management.model';

@Component({
    selector: 'check-management',
    templateUrl: './check-management.component.html',
    styleUrls: ['./check-management.component.scss'],
})
export class CheckManagementComponent implements OnInit {
    public individualCheckQuantity: number = 50;
    public individualChecks: Array<IndividualCheckModel> = [];
    public showIndividualChecks: boolean = false;
    public individualCheckNumberToFilter: number | undefined;
    public individualCheckNameToFilter: string | undefined;
    @ViewChild('managementIndividualCheckRef') managementIndividualCheckRef: ManagementIndividualChecksComponent | undefined;

    //Related to tables
    public tableQuantity: number = 50;
    public tables: Array<TableModel> = [];
    public showTables: boolean = true;
    public tableNumberToFilter: number | undefined;
    public tableNameToFilter: string | undefined;
    @ViewChild('managementTablesRef') managementTablesRef: ManagementTablesComponent | undefined;

    private checkHelper = new CheckManagementHelper();

    constructor(
        private _erMessagesSnackbar: ErMessages,
        private _messages: MessagesKeys,
        private _sortService: SortService,
        private _checkManagementApi: CheckManagementApi,
        private _auth: AuthService,
    ) {}

    ngOnInit(): void {
        this.handleTablesQuantity();
        this.handleIndividualChecksQuantity();
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
            if(!checkResult.table.isIndividualCheck){
                this.handleClosedTableCheck(checkResult.table);
            }else{
                this.handleClosedIndividualCheck(checkResult.table);
            }
            this._erMessagesSnackbar.openSnackBar(this._messages.checkClosedSucessfully, 'sucess');
        } else if (checkResult.checkOptions.active) {
            if(!checkResult.table.isIndividualCheck){
                this.handleTableActive(checkResult.table);
            }else{
                this.handleIndividualCheckActive(checkResult.table);
            }
        }
    };

    private handleClosedTableCheck = (table: TableModel): void => {
      
        this._checkManagementApi
        .closeCheck(table.invoiceId)
        .subscribe(
            () => {},
            (err) => {
                console.error(err);
            },
        );
  
        
        const tableIndex = 
            this.checkHelper.findTableOrIndividualCheckIndexByNumber(this.tables, table.number);
        if (tableIndex) {
            this.tables[tableIndex] = new TableModel();
            this.tables[tableIndex].number = table.number;
            this.tables = [...this.tables];
        } else {
            throw new Error('Can not clear table after finish because it was not found in table list');
        }
    };
   
    private handleClosedIndividualCheck = (individualCheck: IndividualCheckModel): void => {
        this._checkManagementApi
            .closeCheck(individualCheck.invoiceId)
            .subscribe(
                () => {},
                (err) => {
                    console.error(err);
                },
            );

        const individualCheckIndex = 
            this.checkHelper.findTableOrIndividualCheckIndexByNumber(this.individualChecks, individualCheck.number);
        if (individualCheckIndex) {
            this.individualChecks[individualCheckIndex] = new TableModel();
            this.individualChecks[individualCheckIndex].number = individualCheck.number;
            this.individualChecks = [...this.individualChecks];
        } else {
            throw new Error('Can not clear table after finish because it was not found in table list');
        }
    };

    private handleTableActive = (table: TableModel) => {
        const tableIndex = this.checkHelper.findTableOrIndividualCheckIndexByNumber(this.tables, table.number);
        if (tableIndex) {
            this.tables[tableIndex] = table;
        } else {
            this.tables.push(table);
        }
        if (this.tables.length > 0) {
            this.tables = this._sortService.sortByProperty(this.tables, 'number');
        }
    };
  
    private handleIndividualCheckActive = (individualCheck: IndividualCheckModel) => {
        const individualCheckIndex = this.checkHelper.findTableOrIndividualCheckIndexByNumber(this.tables, individualCheck.number);
        if (individualCheckIndex) {
            this.individualChecks[individualCheckIndex] = individualCheck;
        } else {
            this.individualChecks.push(individualCheck);
        }
        if (this.individualChecks.length > 0) {
            this.individualChecks = this._sortService.sortByProperty(this.individualChecks, 'number');
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

    private filterTableByClientName = (text: string): void => {
        this.tableNameToFilter = text;
    };

    //TODO
    //implementar filtro das comandas
    private filterIndividualChecks = (payload: ManagementFilterPayload): void => {
        const isFilterByClientName = payload.nameFilterText !== '';
        const isFilterByTableNumber = payload.numberFilterText !== undefined;
        if (!isFilterByTableNumber) {
            this.managementIndividualCheckRef?.resetIndivdualChecksFilter();
        }
        if (isFilterByClientName) {
            this.filterIndividualCheckByClientName(payload.nameFilterText);
        } else if (isFilterByTableNumber) {
            this.individualCheckNumberToFilter = payload.numberFilterText;
        }
    };

    private filterIndividualCheckByClientName = (text: string): void => {
        this.individualCheckNameToFilter = text;
    };

    private handleTablesQuantity() {
        this.tables = [];
        for (let index = 1; index <= this.tableQuantity; index++) {
            let table = new TableModel(index);
            table.number = index;
            this.tables.push(table);
        }
    }
    
    private handleIndividualChecksQuantity() {
        this.individualChecks = [];
        for (let index = 1; index <= this.individualCheckQuantity; index++) {
            let individualCheck = new IndividualCheckModel(index);
            individualCheck.number = index;
            this.individualChecks.push(individualCheck);
        }
    }

    private getActivesTablesAndIndividualChecks = (): void => {
        this._checkManagementApi.getActiveTablesAndIndividualChecksNumber().subscribe(
            (result) => {
                this.tagActiveChecks(result);
            },
            (err) => {
                console.log(err);
            },
        );
    };

    private tagActiveChecks = (activeChecks: Array<ActiveTable>): void => {
        let activeTables: Array<ActiveTable> = [];
        let individualChecks: Array<ActiveIndividualCheck> = [];

        activeChecks.forEach((element) => {
            if (element.tableNumber) {
                activeTables.push(element);
            } else {
                individualChecks.push(element);
            }
        });

        this.fillActiveTablesAndIndividualChecksBasicInfo(activeTables,individualChecks);
    };

    private fillActiveTablesAndIndividualChecksBasicInfo = (activeTables: Array<ActiveTable>,activeIndividualChecks: Array<ActiveTable>): void => {
        this.tables.forEach((table) => {
            const activeTable = activeTables.find((activeTable) => {
                return activeTable.tableNumber === table.number;
            });

            if (activeTable) {
                table.isActive = true;
                table.invoiceId = activeTable.id;
                if(activeTable.clientName){
                    table.clientName = activeTable.clientName;
                }
            }
        });
      
        this.individualChecks.forEach((individualCheck) => {
            const activeIndividualCheck = activeIndividualChecks.find((activeIndividualCheck) => {
                return activeIndividualCheck.individualCheckNumber === individualCheck.number;
            });

            if (activeIndividualCheck) {
                individualCheck.isActive = true;
                individualCheck.invoiceId = activeIndividualCheck.id;
                if(activeIndividualCheck.clientName){
                    individualCheck.clientName = activeIndividualCheck.clientName;
                }
            }
        });
    };
}
