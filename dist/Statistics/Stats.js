"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class timeDataset {
    constructor(timestamp, value) {
        this.timestamp = timestamp;
        this.value = value;
    }
}
;
class Counter {
    constructor() {
        this._value = 0;
        this.history = [];
        this._increasedCallbacks = [];
        this._decreasedCallbacks = [];
        var range = Stats.historyRange;
        for (let i = 0; i < range; i++) {
            this.history.push(new timeDataset());
        }
    }
    inc() {
        this._value += 1;
        return this;
    }
    dec() {
        this._value -= 1;
        return this;
    }
    get value() {
        return this._value;
    }
    plot() {
        const dataset = new timeDataset(new Date(), this.value);
        this.history.shift();
        this.history.push(dataset);
        this.reset();
        return this;
    }
    reset() {
        this._value = 0;
        return this;
    }
    onInc(cb) {
        this._increasedCallbacks.push(cb);
    }
    onDec(cb) {
        this._decreasedCallbacks.push(cb);
    }
}
exports.Counter = Counter;
class Stats {
    static reset() {
        this.Errors.reset();
        this.Warnings.reset();
        this.Logs.reset();
        return this;
    }
    static get Outs() {
        return this.Errors.value + this.Warnings.value + this.Logs.value;
    }
    static report() {
        Stats.startClock();
    }
    static startClock() {
        return setInterval(() => {
            const now = new Date();
            if (Stats.minuteHasChanged(now)) {
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
    static minuteHasChanged(now) {
        const initMin = Stats.currentDate.getMinutes();
        const nowMin = now.getMinutes();
        if (initMin < nowMin) {
            Stats.currentDate = now;
            return true;
        }
        else
            return false;
    }
    static hourHasChanged(now) {
        const initHour = Stats.currentDate.getHours();
        const nowHour = now.getHours();
        if (initHour < nowHour) {
            Stats.currentDate = now;
            return true;
        }
        else
            return false;
    }
    static dayHasChanged(now) {
        const initDay = Stats.currentDate.getDay();
        const nowDay = now.getDay();
        if (initDay < nowDay) {
            Stats.currentDate = now;
            return true;
        }
        else
            return false;
    }
}
Stats.currentDate = new Date();
Stats.historyRange = 15;
Stats.Errors = new Counter();
Stats.Warnings = new Counter();
Stats.Logs = new Counter();
Stats._minuteChangedCallback = () => { };
Stats._dayChangedCallback = () => { };
Stats._hourChangedCallback = () => { };
exports.Stats = Stats;
