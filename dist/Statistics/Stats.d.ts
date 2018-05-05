export declare type counterChangedCallback = (conter: Counter) => void;
export declare class timeDataset {
    timestamp?: Date;
    value?: number;
    constructor(timestamp?: Date, value?: number);
}
export declare class Counter {
    constructor();
    private _value;
    inc(): Counter;
    dec(): Counter;
    readonly value: number;
    plot(): Counter;
    reset(): Counter;
    private history;
    private _increasedCallbacks;
    onInc(cb: counterChangedCallback): void;
    private _decreasedCallbacks;
    onDec(cb: counterChangedCallback): void;
}
declare class Stats {
    private static currentDate;
    static historyRange: number;
    static Errors: Counter;
    static Warnings: Counter;
    static Logs: Counter;
    static reset(): Stats;
    static readonly Outs: number;
    static report(): void;
    private static _minuteChangedCallback;
    private static _dayChangedCallback;
    private static _hourChangedCallback;
    private static startClock();
    private static minuteHasChanged(now);
    private static hourHasChanged(now);
    private static dayHasChanged(now);
}
export { Stats };
