"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actuar_1 = require("../Actuar");
const ActuarLog_1 = require("./ActuarLog");
class Logger {
    constructor(name) {
        this._name = 'logger';
        this._muted = false;
        this._write = true;
        this._name = name;
    }
    mute() { this._muted = true; }
    unmute() { this._muted = false; }
    writable() { this._write = true; }
    unwritable() { this._write = false; }
    get name() {
        return this._name;
    }
    get $name() {
        return this._name.toUpperCase();
    }
    log(message) {
        if (Actuar_1.ENV.LOGLVL < Actuar_1.LogLevel.INFO)
            return;
        let log = {
            muted: this._muted,
            write: this._write,
            instance: this.$name,
            timestamp: new Date(),
            message: message,
            type: Actuar_1.LogType.Error
        };
        const aLog = new ActuarLog_1.ActuarLog(log);
        if (!this._muted)
            console.log(aLog.toString());
    }
    warn(message, line, file) {
        if (Actuar_1.ENV.LOGLVL < Actuar_1.LogLevel.WARN)
            return;
        let log = {
            muted: this._muted,
            write: this._write,
            instance: this.$name,
            timestamp: new Date(),
            line: line,
            file: file,
            message: message,
            type: Actuar_1.LogType.Error
        };
        const aLog = new ActuarLog_1.ActuarLog(log);
        if (!this._muted)
            console.log(aLog.toString());
    }
    error(message, line, file) {
        if (Actuar_1.ENV.LOGLVL < Actuar_1.LogLevel.ERROR)
            return;
        let log = {
            muted: this._muted,
            write: this._write,
            instance: this.$name,
            timestamp: new Date(),
            line: line,
            file: file,
            message: message,
            type: Actuar_1.LogType.Error
        };
        const aLog = new ActuarLog_1.ActuarLog(log);
        if (!this._muted)
            console.log(aLog.toString());
    }
    debug(message, line, file) {
        if (Actuar_1.ENV.LOGLVL < Actuar_1.LogLevel.DEBUG || !Actuar_1.ENV.DEBUG)
            return;
        let log = {
            muted: this._muted,
            write: this._write,
            instance: this.$name,
            timestamp: new Date(),
            line: line,
            file: file,
            message: message,
            type: Actuar_1.LogType.Error
        };
        const aLog = new ActuarLog_1.ActuarLog(log);
        if (!this._muted)
            console.log(aLog.toString());
    }
}
exports.Logger = Logger;
