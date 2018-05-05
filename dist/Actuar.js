"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
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
var DataTypes;
(function (DataTypes) {
    DataTypes[DataTypes["Table"] = 0] = "Table";
})(DataTypes = exports.DataTypes || (exports.DataTypes = {}));
var StatInterval;
(function (StatInterval) {
    StatInterval[StatInterval["Hour"] = 0] = "Hour";
    StatInterval[StatInterval["Day"] = 1] = "Day";
    StatInterval[StatInterval["Week"] = 2] = "Week";
})(StatInterval = exports.StatInterval || (exports.StatInterval = {}));
exports.moduleName = "actuar";
var Settings;
(function (Settings) {
    Settings.RemoteIp = "localhost";
    Settings.RemotePort = 8989;
    Settings.LocalPort = 9090;
    Settings.HttpPort = 9191;
    Settings.Level = LogLevel.ACTUAR;
    Settings.Debug = (process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1);
    Settings.Root = path_1.resolve(path_1.join(os_1.tmpdir(), exports.moduleName));
})(Settings = exports.Settings || (exports.Settings = {}));
fs_1.existsSync(Settings.Root) ? null : fs_1.mkdirSync(Settings.Root);
const Actuar_1 = require("./Actuar");
function setLocalPort(port) {
    Settings.LocalPort = port;
}
exports.setLocalPort = setLocalPort;
function setRemotePort(port) {
    Settings.RemotePort = port;
}
exports.setRemotePort = setRemotePort;
function setRemoteIp(ip) {
    Settings.RemoteIp = ip;
}
exports.setRemoteIp = setRemoteIp;
function enableDebug() { Settings.Debug = true; }
exports.enableDebug = enableDebug;
;
function setLogLevel(lvl) {
    Settings.Level = lvl;
}
exports.setLogLevel = setLogLevel;
function getRootDir() {
    return Settings.Root;
}
exports.getRootDir = getRootDir;
function setRootDir(dir) {
    return new Promise((res, rej) => {
        dir = path_1.resolve(dir);
        if (path_1.basename(dir) !== exports.moduleName) {
            dir = path_1.join(dir, exports.moduleName);
        }
        createDirectory(dir).then(path => { Settings.Root = path; res(); });
    });
}
exports.setRootDir = setRootDir;
function createDirectory(dir) {
    return new Promise((res, rej) => {
        if (!fs_1.existsSync(dir)) {
            fs_1.mkdir(dir, (err) => {
                if (err) {
                    if (Settings.Level === LogLevel.ACTUAR) {
                        new Actuar_1.Logger(exports.moduleName).unwritable().error(`Can not create directory ${dir}`);
                    }
                    res(os_1.tmpdir());
                }
                else {
                    res(dir);
                }
            });
        }
        else {
            res(dir);
        }
    });
}
exports.createDirectory = createDirectory;
var Logger_1 = require("./Logger/Logger");
exports.Logger = Logger_1.Logger;
var Transceiver_1 = require("./ActuarTransceiver/Transceiver");
exports.Transceiver = Transceiver_1.Transceiver;
var HttpServer_1 = require("./HttpServer/HttpServer");
exports.Server = HttpServer_1.Server;
var ActuarLog_1 = require("./Logger/ActuarLog");
exports.ActuarLog = ActuarLog_1.ActuarLog;
var Stats_1 = require("./Statistics/Stats");
exports.Stats = Stats_1.Stats;
