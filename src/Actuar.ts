import { PathLike, mkdir, existsSync } from "fs";
import { resolve } from "path";
import { Logger } from "./Actuar";

export { Logger } from "./Logger/Logger";

export enum LogLevel {
    INFO,
    WARN,
    ERROR,
    DEBUG,
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
    export let LOGLVL: LogLevel = LogLevel.INFO;
    export let DEBUG: boolean = (process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1);
    export let DIR : PathLike = __dirname;
}
export function enableDebug(): void { ENV.DEBUG = true; };

export function getLogfilesDir(): PathLike {
    return ENV.DIR;
}
export function setLogfilesDir(dir: PathLike): void {
    dir = resolve(dir as string);
    if(!existsSync(dir)){
        mkdir(dir, err => {
            if (err) new Logger("actuar").error(`Can not create directory ${dir}`);
            else ENV.DIR = dir;
        });
    } else ENV.DIR = dir;
}