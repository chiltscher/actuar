"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const Actuar_1 = require("./Actuar");
var Transceiver_1 = require("./ActuarTransceiver/Transceiver");
exports.Transceiver = Transceiver_1.Transceiver;
var Server_1 = require("./LogServer/Server");
exports.Server = Server_1.Server;
var ActuarLog_1 = require("./Logger/ActuarLog");
exports.ActuarLog = ActuarLog_1.ActuarLog;
var Logger_1 = require("./Logger/Logger");
exports.Logger = Logger_1.Logger;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 0] = "INFO";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
    LogLevel[LogLevel["ACTUAR"] = 4] = "ACTUAR"; // Show all logs, inclusive actuar logs
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var LogType;
(function (LogType) {
    LogType["Error"] = "Error";
    LogType["Warning"] = "Warning";
    LogType["Debug"] = "Debug";
    LogType["Log"] = "";
})(LogType = exports.LogType || (exports.LogType = {}));
var ENV;
(function (ENV) {
    ENV.REMOTE_IP = "localhost";
    ENV.REMOTE_PORT = 8989;
    ENV.LOCAL_PORT = 9090;
    ENV.LOGLVL = LogLevel.ACTUAR;
    ENV.DEBUG = (process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1);
    ENV.DIR = __dirname;
})(ENV = exports.ENV || (exports.ENV = {}));
function setLocalPort(port) {
    ENV.LOCAL_PORT = port;
}
exports.setLocalPort = setLocalPort;
function setRemotePort(port) {
    ENV.REMOTE_PORT = port;
}
exports.setRemotePort = setRemotePort;
function setRemoteIp(ip) {
    ENV.REMOTE_IP = ip;
}
exports.setRemoteIp = setRemoteIp;
function enableDebug() { ENV.DEBUG = true; }
exports.enableDebug = enableDebug;
;
function getLogfilesDir() {
    return ENV.DIR;
}
exports.getLogfilesDir = getLogfilesDir;
function setLogfilesDir(dir) {
    dir = path_1.resolve(dir);
    return new Promise((resolve, reject) => {
        if (!fs_1.existsSync(dir)) {
            fs_1.mkdir(dir, err => {
                if (err) {
                    new Actuar_1.Logger("actuar").unwritable().error(`Can not create directory ${dir}`);
                    reject();
                }
                else {
                    ENV.DIR = dir;
                    resolve();
                }
                ;
            });
        }
        else {
            ENV.DIR = dir;
            resolve();
        }
        ;
    });
}
exports.setLogfilesDir = setLogfilesDir;
//# sourceMappingURL=Actuar.js.map