export class DialogCreateUpdatePayloadModel {
    public data: any;
    public actionSave: boolean = false;
    public actionUpdate: boolean = false;

    constructor(data: any, actionSave: boolean = false, actionUpdate: boolean = false) {
        this.data = data;
        this.actionSave = actionSave;
        this.actionUpdate = actionUpdate;
    }
}
