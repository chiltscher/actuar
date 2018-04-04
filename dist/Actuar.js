"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = require("./Logger/Logger");
exports.Logger = Logger_1.Logger;
var ENV;
(function (ENV) {
    ENV.DEBUG = (process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1);
})(ENV = exports.ENV || (exports.ENV = {}));
function enableDebug() { ENV.DEBUG = true; }
exports.enableDebug = enableDebug;
;
