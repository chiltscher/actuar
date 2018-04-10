"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 0] = "INFO";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
    LogLevel[LogLevel["ACTUAR"] = 4] = "ACTUAR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var LogType;
(function (LogType) {
    LogType["Error"] = "Error";
    LogType["Warning"] = "Warning";
    LogType["Debug"] = "Debug";
    LogType["Log"] = "Info";
})(LogType = exports.LogType || (exports.LogType = {}));
;
var DataTypes;
(function (DataTypes) {
    DataTypes[DataTypes["Table"] = 0] = "Table";
})(DataTypes = exports.DataTypes || (exports.DataTypes = {}));
;
var StatInterval;
(function (StatInterval) {
    StatInterval[StatInterval["Hour"] = 0] = "Hour";
    StatInterval[StatInterval["Day"] = 1] = "Day";
    StatInterval[StatInterval["Week"] = 2] = "Week";
})(StatInterval = exports.StatInterval || (exports.StatInterval = {}));
var ENV;
(function (ENV) {
    ENV.REMOTE_IP = "localhost";
    ENV.REMOTE_PORT = 8989;
    ENV.LOCAL_PORT = 9090;
    ENV.HTTP_PORT = 9191;
    ENV.LOGLVL = LogLevel.ACTUAR;
    ENV.DEBUG = (process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1);
    ENV.ROOT = __dirname;
    ENV.DATADIR = __dirname;
})(ENV = exports.ENV || (exports.ENV = {}));
const fs_1 = require("fs");
const path_1 = require("path");
const Actuar_1 = require("./Actuar");
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
function getGlobalDir() {
    return ENV.ROOT;
}
exports.getGlobalDir = getGlobalDir;
function setGlobalDir(dir) {
    return new Promise((res, rej) => {
        dirCreation(path_1.resolve(dir)).then(path => { ENV.ROOT = path; res(); });
    });
}
exports.setGlobalDir = setGlobalDir;
function dirCreation(dir) {
    return new Promise((resolve, reject) => {
        if (!fs_1.existsSync(dir)) {
            fs_1.mkdir(dir, err => {
                if (err) {
                    new Actuar_1.Logger("actuar").unwritable().error(`Can not create directory ${dir}`);
                    reject();
                }
                else {
                    resolve(dir);
                }
                ;
            });
        }
        else {
            resolve(dir);
        }
        ;
    });
}
var Transceiver_1 = require("./ActuarTransceiver/Transceiver");
exports.Transceiver = Transceiver_1.Transceiver;
var Server_1 = require("./LogServer/Server");
exports.Server = Server_1.Server;
var ActuarLog_1 = require("./Logger/ActuarLog");
exports.ActuarLog = ActuarLog_1.ActuarLog;
var Logger_1 = require("./Logger/Logger");
exports.Logger = Logger_1.Logger;
var Stats_1 = require("./Statistics/Stats");
exports.Stats = Stats_1.Stats;
