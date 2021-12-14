import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(public dialog: MatDialog) {}

    public createDialog = (component: ComponentType<unknown>, height: string, width: string, dataReceived?: any) => {
        const dialogParameters: any = { height: height, width: width };

        if (dataReceived) {
            dialogParameters['data'] = dataReceived;
        }

        return this.dialog.open(component, dialogParameters);
    };
}
