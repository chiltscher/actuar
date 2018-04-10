export type counterChangedCallback = (conter: Counter) => void;
export class timeDataset {
    public timestamp?: Date;
    public value?: number;
    constructor(timestamp?: Date, value?: number){
        this.timestamp = timestamp;
        this.value = value;
    }
};

export class Counter {
    constructor(){
        var range = Stats.historyRange;
        for(let i = 0; i < range; i++) {
            this.history.push(new timeDataset());
        }
    }
    private _value: number = 0;
    public inc(): Counter {
        this._value += 1;
        return this;
    }
    public dec(): Counter {
        this._value -= 1;
        return this;
    }
    public get value(): number {
        return this._value;
    }
    public plot(): Counter {
        const dataset: timeDataset = new timeDataset(new Date(), this.value);
        this.history.shift();
        this.history.push(dataset);
        this.reset();
        return this;
    }
    public reset() : Counter {
        this._value = 0;
        return this;
    }
    private history: timeDataset[] = [];
    private _increasedCallbacks: Array < counterChangedCallback > = [];
    public onInc(cb: counterChangedCallback): void {
        this._increasedCallbacks.push(cb);
    }
    private _decreasedCallbacks: Array < counterChangedCallback > = [];
    public onDec(cb: counterChangedCallback): void {
        this._decreasedCallbacks.push(cb);
    }
}

class Stats {
    private static currentDate: Date = new Date();
    public static historyRange: number = 15;

    public static Errors: Counter = new Counter();
    public static Warnings: Counter = new Counter();
    public static Logs: Counter = new Counter();

    public static reset(): Stats {
        this.Errors.reset();
        this.Warnings.reset();
        this.Logs.reset();
        return this;
    }

    public static get Outs(): number {
        return this.Errors.value + this.Warnings.value + this.Logs.value;
    }

    public static report(): void {
        Stats.startClock();
    }

    private static _minuteChangedCallback: Function = () => {};
    private static _dayChangedCallback: Function = () => {};
    private static _hourChangedCallback: Function = () => {};
    private static startClock(): NodeJS.Timer {
        return setInterval(() => {
            const now = new Date();

            if(Stats.minuteHasChanged(now)) {
                Stats._minuteChangedCallback();
            }

            if (Stats.hourHasChanged(now)) {
                Stats._hourChangedCallback();
            }

            if (this.dayHasChanged(now)) {
                this._dayChangedCallback();
            }

        }, 500);
    }

    private static minuteHasChanged(now: Date) : boolean {
        const initMin = Stats.currentDate.getMinutes();
        const nowMin = now.getMinutes();
        if (initMin < nowMin) {
            Stats.currentDate = now;
            return true;
        } else return false;
    }

    private static hourHasChanged(now: Date) : boolean {
        const initHour = Stats.currentDate.getHours();
        const nowHour = now.getHours();
        if (initHour < nowHour) {
            Stats.currentDate = now;
            return true;
        } else return false;
    }

    private static dayHasChanged(now: Date) : boolean {
        const initDay = Stats.currentDate.getDay();
        const nowDay = now.getDay();
        if (initDay < nowDay) {
            Stats.currentDate = now;
            return true;
        } else return false;
    }
}
export {
    Stats
};