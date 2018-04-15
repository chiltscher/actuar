"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region importing dependencies
const fs_1 = require("fs");
const path_1 = require("path");
//#endregion
//#region types, enums and interfaces
exports.moduleName = "actuar";
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
//#endregion
var ENV;
(function (ENV) {
    ENV.REMOTE_IP = "localhost";
    ENV.REMOTE_PORT = 8989;
    ENV.LOCAL_PORT = 9090;
    ENV.HTTP_PORT = 9191;
    ENV.LOGLVL = LogLevel.ACTUAR;
    ENV.DEBUG = (process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1);
    ENV.ROOT = path_1.resolve(path_1.join(__dirname, exports.moduleName));
})(ENV = exports.ENV || (exports.ENV = {}));
fs_1.existsSync(ENV.ROOT) ? null : fs_1.mkdirSync(ENV.ROOT);
// import Actuar Logger for internal usage
const Actuar_1 = require("./Actuar");
//#region general setup and configuration functions
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
function getRootDir() {
    return ENV.ROOT;
}
exports.getRootDir = getRootDir;
function setRootDir(dir) {
    return new Promise((res, rej) => {
        dir = path_1.resolve(dir);
        if (path_1.basename(dir) !== exports.moduleName) {
            dir = path_1.join(dir, exports.moduleName);
        }
        createDirectory(dir).then(path => { ENV.ROOT = path; res(); });
    });
}
exports.setRootDir = setRootDir;
function createDirectory(dir) {
    return new Promise((resolve, reject) => {
        if (!fs_1.existsSync(dir)) {
            fs_1.mkdir(dir, err => {
                if (err) {
                    if (ENV.LOGLVL === LogLevel.ACTUAR) {
                        new Actuar_1.Logger(exports.moduleName).unwritable().error(`Can not create directory ${dir}`);
                    }
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
exports.createDirectory = createDirectory;
//#endregion
//#region re-exporting modules
var Logger_1 = require("./Logger/Logger");
exports.Logger = Logger_1.Logger;
var Transceiver_1 = require("./ActuarTransceiver/Transceiver");
exports.Transceiver = Transceiver_1.Transceiver;
var Server_1 = require("./Server/Server");
exports.Server = Server_1.Server;
var ActuarLog_1 = require("./Logger/ActuarLog");
exports.ActuarLog = ActuarLog_1.ActuarLog;
var Stats_1 = require("./Statistics/Stats");
exports.Stats = Stats_1.Stats;
//#endregion 
//# sourceMappingURL=Actuar.js.map