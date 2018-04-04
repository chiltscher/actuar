"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const fs_1 = require("fs");
const path_1 = require("path");
const Actuar_1 = require("../Actuar");
class Logger {
    constructor(name) {
        this._name = 'logger';
        this._muted = false;
        this._name = name;
    }
    mute() { this._muted = true; }
    unmute() { this._muted = false; }
    static setGlobalLogfilesDir(dir) {
        fs_1.exists(dir, exists => {
            if (!exists) {
                fs_1.mkdir(dir, err => {
                    if (err)
                        console.log(`Could not create directory for logfiles, using default instead`);
                });
            }
        });
    }
    get name() {
        return this._name;
    }
    get $name() {
        return this._name.toUpperCase();
    }
    log(message) {
        const timestamp = new Date().toLocaleTimeString();
        const instance = this.$name;
        const out = chalk_1.default.keyword('orange')(`[ ${timestamp} ] - ${instance} : ${message}`);
        if (!this._muted)
            console.log(out);
    }
    warn(message, line, file) {
        const timestamp = new Date().toLocaleTimeString();
        const instance = this.$name;
        let error = '';
        if (line && file) {
            error = `(${file}:${line})`;
        }
        const out = chalk_1.default.yellow(`W! [ ${timestamp} ] - ${instance} : ${message} ${error}`);
        if (!this._muted)
            console.log(out);
    }
    error(message, line, file) {
        const timestamp = new Date().toLocaleTimeString();
        const instance = this.$name;
        let error = '';
        if (line && file) {
            error = `(${file}:${line})`;
        }
        const out = chalk_1.default.red(`E! [ ${timestamp} ] - ${instance} : ${message} ${error}`);
        if (!this._muted)
            console.log(out);
    }
    debug(message, line, file) {
        if (Actuar_1.ENV.DEBUG) {
            const timestamp = new Date().toLocaleTimeString();
            const instance = this.$name;
            let error = '';
            if (line && file) {
                error = `(${file}:${line})`;
            }
            const out = chalk_1.default.yellow(`E! [ ${timestamp} ] - ${instance} : ${message} ${error}`);
            if (!this._muted)
                console.log(out);
        }
    }
}
Logger.globalLogfilesDir = path_1.join(__dirname, "logs");
exports.Logger = Logger;
