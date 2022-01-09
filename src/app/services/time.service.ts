import { EventEmitter, Injectable, Output } from '@angular/core';
import { TableStartTime } from '../private/check-management/model/check-management.model';
@Injectable({
    providedIn: 'root',
})
export class TimeService {
    @Output() timeEmmiter = new EventEmitter<string>();
    @Output() startTimeEmmiter = new EventEmitter<TableStartTime>();


    private _startTime: TableStartTime = new TableStartTime();

    constructor() {}

    public parseTableStartTime = (startTime:TableStartTime):string =>{
        return `${this.needZeroBeforeNumber(startTime.hour)} : ${this.needZeroBeforeNumber(startTime.min)} : ${this.needZeroBeforeNumber(startTime.sec)}`;
    }

    public stopCounting(timeCounterReference: any): void {
        clearInterval(timeCounterReference);
    }

    public start = (startTime: TableStartTime) => {
        this._startTime = startTime;
        
        if(!this.tableStartTimeHasBeenInicialized()){
            this.inicializeTableStartTime();
        }

        const intervalReference = setInterval(() => {
            this.findDurationOfTable(this._startTime);
        }, 1000);

        return intervalReference;
    };

    private tableStartTimeHasBeenInicialized = (): boolean => {
        return (
            this._startTime.hour != 0 &&
            this._startTime.min  != 0 &&
            this._startTime.sec  != 0
        )
    }

    private inicializeTableStartTime = (): void => {
        const today = new Date();
        this._startTime.hour = today.getHours();
        this._startTime.min  = today.getMinutes();
        this._startTime.sec  = today.getSeconds();
        this.startTimeEmmiter.emit(this._startTime);
    }
   

    private findDurationOfTable = (startTime: TableStartTime) => {
        let inicialTimeInSeconds = startTime.hour * 3600 + startTime.min * 60 + startTime.sec;

        this.timeEmmiter.emit(this.calcDuration(inicialTimeInSeconds));
    };

    private calcDuration = (inicialTimeInSeconds: number): string => {
        let today = new Date();
        let currentTimeInSeconds = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();

        let difference = currentTimeInSeconds - inicialTimeInSeconds;

        let rest = 0;
        let hour: number = Math.trunc(difference / 3600);
        rest = Math.trunc(difference % 3600);
        let min: number = Math.trunc(rest / 60);
        rest = Math.trunc(rest % 60);
        let sec: number = Math.trunc(rest);

        const startTime = new TableStartTime(hour,min,sec);

        return this.parseTableStartTime(startTime);
    };

    private needZeroBeforeNumber = (number: number) => {
        if (number < 10) {
            return `0${number}`;
        } else {
            return number.toString();
        }
    };

  

}
