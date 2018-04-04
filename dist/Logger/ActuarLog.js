"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const Actuar_1 = require("../Actuar");
class ActuarLog {
    constructor(log) {
        this.instance = log.instance;
        this.type = log.type;
        this.message = log.message;
        this.timestamp = new Date(Date.parse(log.timestamp.toString()));
        this.line = log.line;
        this.file = log.file;
        this.muted = log.muted;
        this.write = log.write;
        switch (this.type) {
            case Actuar_1.LogType.Log:
                this.colorize = chalk_1.default.keyword('orange');
                break;
            case Actuar_1.LogType.Warning:
                this.colorize = chalk_1.default.yellow;
                break;
            case Actuar_1.LogType.Debug:
                this.colorize = chalk_1.default.yellow;
                break;
            case Actuar_1.LogType.Error:
                this.colorize = chalk_1.default.red;
                break;
            default:
                this.colorize = chalk_1.default.keyword('orange');
        }
    }
    toJson() {
        return {
            instance: this.instance,
            type: this.type,
            message: this.message,
            timestamp: this.timestamp,
            line: this.line,
            file: this.file,
            muted: this.muted,
            write: this.write
        };
    }
    toString() {
        let error = "";
        if (this.line && this.file) {
            error = `(${this.file}:${this.line})`;
        }
        return this.colorize(`[${this.timestamp.toLocaleTimeString()}] - ${this.instance} ${this.type.toUpperCase()} : ${this.message} ${error}`);
    }
}
exports.ActuarLog = ActuarLog;
