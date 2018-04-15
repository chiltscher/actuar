"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actuar_1 = require("../Actuar");
const ActuarLog_1 = require("./ActuarLog");
const fs_1 = require("fs");
const path_1 = require("path");
const Actuar_2 = require("../Actuar");
class Logger {
    constructor(name) {
        // protected static DBG: boolean = false;
        this._name = 'logger';
        this._muted = false;
        this._write = true;
        this._remote = false;
        this._name = name;
    }
    mute() { this._muted = true; return this; }
    unmute() { this._muted = false; return this; }
    writable() { this._write = true; return this; }
    unwritable() { this._write = false; return this; }
    remote() { this._remote = true; return this; }
    unremote() { this._remote = false; return this; }
    static get DIR() {
        return path_1.join(Actuar_1.ENV.ROOT, "logfiles");
    }
    ;
    static writeOut(log) {
        if (!fs_1.existsSync(Logger.DIR)) {
            Actuar_1.createDirectory(Logger.DIR).then(() => Logger.writeOut(log));
        }
        else {
            let FILE = path_1.join(Logger.DIR, new Date().toLocaleDateString()) + Logger.EXT;
            fs_1.appendFile(FILE, log.toJsonString() + ",\r\n", () => { });
        }
    }
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
            type: Actuar_1.LogType.Log
        };
        const aLog = new ActuarLog_1.ActuarLog(log);
        if (this._remote)
            Actuar_2.Transceiver.sendLog(aLog);
        if (this._write)
            Logger.writeOut(aLog);
        if (!this._muted)
            console.log(aLog.toString());
        Actuar_1.Stats.Logs.inc();
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
            type: Actuar_1.LogType.Warning
        };
        const aLog = new ActuarLog_1.ActuarLog(log);
        if (this._remote)
            Actuar_2.Transceiver.sendLog(aLog);
        if (this._write)
            Logger.writeOut(aLog);
        if (!this._muted)
            console.log(aLog.toString());
        Actuar_1.Stats.Warnings.inc();
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
        if (this._write)
            Logger.writeOut(aLog);
        if (!this._muted)
            console.log(aLog.toString());
        Actuar_1.Stats.Errors.inc();
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
            type: Actuar_1.LogType.Debug
        };
        const aLog = new ActuarLog_1.ActuarLog(log);
        if (this._remote)
            Actuar_2.Transceiver.sendLog(aLog);
        if (this._write)
            Logger.writeOut(aLog);
        if (!this._muted)
            console.log(aLog.toString());
    }
}
Logger.EXT = ".aLog";
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map