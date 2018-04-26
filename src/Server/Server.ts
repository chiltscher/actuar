import { readdir, readFile } from "fs";
import { Settings, Logger, IActuarLog, ActuarLog, LogLevel, moduleName } from "../Actuar";
import { resolve, extname, join } from "path";
import * as express from "express";

export type fileList = { [key : string] : string };

class Server {
    private static app : express.Application = express();
    public static getLogFiles() : Promise<fileList> {
        return new Promise <fileList>((res, rej) => {
            readdir(Logger.DIR, (err, files) => {
                if(err) {
                    if (Settings.Level === LogLevel.ACTUAR) {
                        new Logger(moduleName).unwritable().error("Can not read logfiles directory");
                    }
                    rej();
                }
                else {
                    let result: fileList = {};
                    files.forEach(file => {
                        if(extname(file) === Logger.EXT) {
                            let path : string = resolve(join(Logger.DIR as string, file));
                            result[file] = path;
                }
                    });
                    res(result);
                }
            });
        });
    }

    public static getLogsFromFile(path: string) : Promise<IActuarLog[]>{
        return new Promise<IActuarLog[]>((res, rej) => {
            readFile(path, (err, content) => {
                if (err) {
                    if (Settings.Level === LogLevel.ACTUAR) {                                    
                        new Logger(moduleName).unwritable().error(`Can not read logfile ${path}`);
                    }
                    rej();
                }
                else {
                    let contentString = content.toString();
                    contentString = `[${contentString.substring(0, contentString.length - 3)}]`;
                    let data : IActuarLog[] = JSON.parse(contentString);
                    let result: IActuarLog[] = [];
                    data.forEach(date => {
                        result.push(new ActuarLog(date).toJson());
                    });
                    res(result);
                }
            });
        });
    }

    public static listen() {
        this.startUpServer();
    };

    private static startUpServer() {
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
            that.getLogFiles().then((files) => {
                const file = `${date}.aLog`;
                const path = files[file];
                if (path === undefined) res.render('index', { noFile: true, file: file });
                that.getLogsFromFile(path).then((logs) => {
                    res.render('index', {logs: logs, file: file, fileList: files, noFile: false});
                });
            });
        });
        app.listen(Settings.HttpPort);
    }
}

export { Server }