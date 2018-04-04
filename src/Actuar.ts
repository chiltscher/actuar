import { PathLike, mkdir, existsSync } from "fs";
import { resolve } from "path";
import { Logger } from "./Actuar";
export { ActuarLog } from "./Logger/ActuarLog";

export { Logger } from "./Logger/Logger";

export enum LogLevel {
    INFO,
    WARN,
    ERROR,
    DEBUG,
    ALL
}
export enum LogType {
    Error = "Error",
    Warning = "Warning",
    Debug = "Debug",
    Log = "",
}
export interface IActuarLog {
    instance: string;
    type: LogType;
    message: string;
    timestamp: Date | string;
    line?: number;
    file?: PathLike;
    write?: boolean;
    muted?: boolean;
}

export namespace ENV {
    export let REMOTE_IP: string = "";
    export let REMOTE_PORT: number = 8989;
    export let LOGLVL: LogLevel = LogLevel.ALL;
    export let DEBUG: boolean = (process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1);
    export let DIR : PathLike = __dirname;
}
export function enableDebug(): void { ENV.DEBUG = true; };

export function getLogfilesDir(): PathLike {
    return ENV.DIR;
}
export function setLogfilesDir(dir: PathLike): Promise<void> {
    dir = resolve(dir as string);
    return new Promise<void>((resolve, reject) => {
        if(!existsSync(dir)){
            mkdir(dir, err => {
                if (err) {
                    new Logger("actuar").error(`Can not create directory ${dir}`);
                    reject();
                }
                else { ENV.DIR = dir; resolve()};
            });
        } else { ENV.DIR = dir; resolve() };
    });
}