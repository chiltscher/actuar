"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const Actuar_1 = require("../Actuar");
const path_1 = require("path");
const express = require("express");
class Server {
    static getFiles() {
        return new Promise((res, rej) => {
            fs_1.readdir(Actuar_1.ENV.ROOT, (err, files) => {
                if (err) {
                    new Actuar_1.Logger("actuar").unwritable().error("Can not read logfiles directory");
                    rej();
                }
                else {
                    let result = {};
                    files.forEach(file => {
                        if (path_1.extname(file) === Actuar_1.Logger.EXT) {
                            let path = path_1.resolve(path_1.join(Actuar_1.ENV.ROOT, file));
                            result[file] = path;
                        }
                    });
                    res(result);
                }
            });
        });
    }
    static getLogsFromFile(path) {
        return new Promise((res, rej) => {
            fs_1.readFile(path, (err, content) => {
                if (err) {
                    new Actuar_1.Logger("actuar").unwritable().error(`Can not read logfile ${path}`);
                    rej();
                }
                else {
                    let contentString = content.toString();
                    contentString = `[${contentString.substring(0, contentString.length - 3)}]`;
                    let data = JSON.parse(contentString);
                    let result = [];
                    data.forEach(date => {
                        result.push(new Actuar_1.ActuarLog(date).toJson());
                    });
                    res(result);
                }
            });
        });
    }
    static listen() {
        this.startUpServer();
    }
    ;
    static startUpServer() {
        var that = this;
        const app = this.app;
        app.set('view engine', 'pug');
        app.get('/favicon.ico', (req, res, next) => {
            res.end();
        });
        app.get('/', (req, res, next) => {
            let today = new Date().toLocaleDateString();
            res.redirect(`/${today}`);
        });
        app.get('/:date', (req, res, next) => {
            let date = req.params.date;
            that.getFiles().then((files) => {
                const file = `${date}.aLog`;
                const path = files[file];
                if (path === undefined)
                    res.render('index', { noFile: true, file: file });
                that.getLogsFromFile(path).then((logs) => {
                    res.render('index', { logs: logs, file: file, fileList: files, noFile: false });
                });
            });
        });
        app.listen(Actuar_1.ENV.HTTP_PORT);
    }
}
Server.app = express();
exports.Server = Server;
