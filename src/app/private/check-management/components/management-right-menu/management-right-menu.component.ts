import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'management-right-menu',
    templateUrl: './management-right-menu.component.html',
    styleUrls: ['./management-right-menu.component.scss'],
})
export class ManagementRightMenuComponent implements OnInit {
    @Input() totalOccupiedTables: number = 0;
    @Input() maxTablesPermitted: number = 0;
    @Input() totalOccupiedIndividualChecks: number = 0;
    @Input() maxIndividualPermitted: number = 0;

    constructor() {}
    ngOnInit(): void {}
}
