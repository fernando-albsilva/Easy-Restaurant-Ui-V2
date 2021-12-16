import { Component, Input } from '@angular/core';

import { MessagesKeys } from '../../../../../services/messages-keys.service';

import { WorkerFlatModel } from 'src/app/private/worker/Model/woker.model';

@Component({
    selector: 'worker-card',
    templateUrl: 'worker-card.component.html',
    styleUrls: ['worker-card.component.scss', '../styles/shared-card-style.scss'],
})
export class WorkerCardComponent {
    @Input() set item(workerFlatModel: WorkerFlatModel) {
        this.workerFlatModel = workerFlatModel;
    }

    @Input() selected = false;

    public workerFlatModel: WorkerFlatModel = new WorkerFlatModel();

    constructor(public messages: MessagesKeys) {}
}
