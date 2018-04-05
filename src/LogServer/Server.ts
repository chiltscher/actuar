import { readdir, PathLike, readFile } from "fs";
import { ENV, Logger, IActuarLog, ActuarLog } from "../Actuar";
import { resolve, extname, join } from "path";

class Server {
    public static fileList() : Promise<string[]> {
        return new Promise <string[]>((res, rej) => {
            readdir(ENV.DIR, (err, files) => {
                if(err) {
                    new Logger("actuar").unwritable().error("Can not read logfiles directory");
                    rej();
                }
                else {
                    let result: string[] = [];
                    files.forEach(file => {
                        if(extname(file) === Logger.extension) {
                            let path : string = resolve(join(ENV.DIR as string, file));
                            result.push(path);
                }
                    });
                    res(result);
                }
            });
        });
    }

    public static getLogsFromFile(path: PathLike) : Promise<ActuarLog[]>{
        return new Promise<ActuarLog[]>((res, rej) => {
            readFile(path, (err, content) => {
                if (err) {
                    new Logger("actuar").unwritable().error(`Can not read logfile ${path}`);
                    rej();
                }
                else {
                    let contentString = content.toString();
                    contentString = `[${contentString.substring(0, contentString.length - 3)}]`;
                    let data : IActuarLog[] = JSON.parse(contentString);
                    let result: ActuarLog[] = [];
                    data.forEach(date => {
                        result.push(new ActuarLog(date));
                    });
                    res(result);
                }
            });
        });
    }
}

export { Server }