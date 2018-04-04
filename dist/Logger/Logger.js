"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const fs_1 = require("fs");
const path_1 = require("path");
class Logger {
    constructor(name) {
        this._name = 'logger';
        this._name = name;
    }
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
        console.log(chalk_1.default.keyword('orange')(`[ ${timestamp} ] - ${instance} : ${message}`));
    }
    warn(message, line, file) {
        const timestamp = new Date().toLocaleTimeString();
        const instance = this.$name;
        let error = '';
        if (line && file) {
            error = `(${file}:${line})`;
        }
        console.log(chalk_1.default.red(`E! [ ${timestamp} ] - ${instance} : ${message} ${error}`));
    }
    error(message, line, file) {
        const timestamp = new Date().toLocaleTimeString();
        const instance = this.$name;
        let error = '';
        if (line && file) {
            error = `(${file}:${line})`;
        }
        console.log(chalk_1.default.red(`E! [ ${timestamp} ] - ${instance} : ${message} ${error}`));
    }
    debug(message, line, file) {
        if (Logger.DEBUG) {
            const timestamp = new Date().toLocaleTimeString();
            const instance = this.$name;
            let error = '';
            if (line && file) {
                error = `(${file}:${line})`;
            }
            console.log(chalk_1.default.yellow(`E! [ ${timestamp} ] - ${instance} : ${message} ${error}`));
        }
    }
}
// protected static DBG: boolean = false;
Logger.DEBUG = process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1;
Logger.globalLogfilesDir = path_1.join(__dirname, "logs");
exports.Logger = Logger;
