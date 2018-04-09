import {
    StatInterval
} from "../Actuar";

type counterChangedCallback = (conter: Counter) => void;
type KeyValue = {
    [key: string]: any
};

class Counter {
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
    public reset(): Counter {
        this._value = 0;
        return this;
    }
    private static history: KeyValue[] = [];
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
    // private static readonly intervall : StatInterval = StatInterval.Day;
    // private static readonly range : number = 24;
    private static currentDate: Date = new Date();

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
    private static startClock(): NodeJS.Timer {
        return setInterval(() => {
            const initDay = Stats.currentDate.getDay();
            const nowDay = new Date().getDay();
            if (initDay < nowDay) {
                console.log("Day changed");
                Stats.currentDate = new Date();
            }

            const initMin = Stats.currentDate.getMinutes();
            const nowMin = new Date().getMinutes();
            if (initMin < nowMin) {
                console.log(`Minute changed! ${initMin} ${nowMin}`);
                Stats.currentDate = new Date();
            }
        }, 500);
    }
}
export {
    Stats
};