import { readdir, PathLike, readFile } from "fs";
import { ENV, Logger, IActuarLog, ActuarLog } from "../Actuar";
import { resolve, extname, join } from "path";
import * as express from "express";
import { request } from "https";

type fileList = { [key : string] : string };

class Server {
    private static app : express.Application = express();
    public static getFiles() : Promise<fileList> {
        return new Promise <fileList>((res, rej) => {
            readdir(ENV.LOGDIR, (err, files) => {
                if(err) {
                    new Logger("actuar").unwritable().error("Can not read logfiles directory");
                    rej();
                }
                else {
                    let result: fileList = {};
                    files.forEach(file => {
                        if(extname(file) === Logger.extension) {
                            let path : string = resolve(join(ENV.LOGDIR as string, file));
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
                    new Logger("actuar").unwritable().error(`Can not read logfile ${path}`);
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
            that.getFiles().then((files) => {
                const file = `${date}.aLog`;
                const path = files[file];
                if (path === undefined) res.render('index', { noFile: true, file: file });
                that.getLogsFromFile(path).then((logs) => {
                    res.render('index', {logs: logs, file: file, fileList: files, noFile: false});
                });
            });
        });
        app.listen(ENV.HTTP_PORT);
    }
}

export { Server }