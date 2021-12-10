import { Component, Input } from '@angular/core';

import { MessagesKeys } from '../../../../../services/messages-keys.service';
import { WorkerModel } from 'src/app/private/worker/Model/woker-model';

@Component({
    selector: 'worker-card',
    templateUrl: 'worker-card.component.html',
    styleUrls: ['worker-card.component.scss', '../styles/shared-card-style.scss'],
})
export class WorkerCardComponent {
    @Input() set item(workerModel: WorkerModel) {
        this.workerModel = workerModel;
    }

    @Input() selected = false;

    public workerModel: WorkerModel = new WorkerModel();

    constructor(public messages: MessagesKeys) {}
}
