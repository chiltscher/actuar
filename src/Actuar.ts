//#region importing dependencies
import { PathLike, mkdir, existsSync, mkdirSync } from "fs";
import { resolve, join, basename } from "path";
//#endregion

//#region types, enums and interfaces
export const moduleName = "actuar";
export enum LogLevel {
    INFO,
    WARN,
    ERROR,
    DEBUG,
    ACTUAR // Show all logs, inclusive actuar logs
}
export enum LogType {
    Error = "Error",
    Warning = "Warning",
    Debug = "Debug",
    Log = "Info",
};
export enum DataTypes {
    Table
};
export enum StatInterval {
    Hour, Day, Week
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
    kindOf?: string;
}
//#endregion

export namespace ENV {
    export let REMOTE_IP: string = "localhost";
    export let REMOTE_PORT: number = 8989;
    export let LOCAL_PORT: number = 9090;
    export let HTTP_PORT: number = 9191;
    export let LOGLVL: LogLevel = LogLevel.ACTUAR;
    export let DEBUG: boolean = (process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1);
    export let ROOT: PathLike = resolve(join(__dirname, moduleName));
}

existsSync(ENV.ROOT) ? null : mkdirSync(ENV.ROOT);
// import Actuar Logger for internal usage
import { Logger } from "./Actuar";

//#region general setup and configuration functions
export function setLocalPort(port: number) : void {
    ENV.LOCAL_PORT = port;
}

export function setRemotePort(port: number) : void {
    ENV.REMOTE_PORT = port;
}

export function setRemoteIp(ip: string) : void {
    ENV.REMOTE_IP = ip;
}

export function enableDebug(): void { ENV.DEBUG = true; };

export function getRootDir(): PathLike {
    return ENV.ROOT;
}
export function setRootDir(dir: PathLike): Promise<void> {
    return new Promise<void>((res, rej) => {
        dir = resolve(dir as string);
        if(basename(dir) !== moduleName) {
            dir = join(dir, moduleName)
        }
        createDirectory(dir).then(
            path => { ENV.ROOT = path; res(); }
        );
});
}

export function createDirectory(dir: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if (!existsSync(dir)) {
            mkdir(dir, err => {
                if (err) {
                    if(ENV.LOGLVL === LogLevel.ACTUAR) {
                        new Logger(moduleName).unwritable().error(`Can not create directory ${dir}`);
                    }
                    reject();
                }
                else { resolve(dir as string)  };
            });
        } else { resolve(dir as string) };
    });
}
//#endregion

//#region re-exporting modules
export { Logger } from "./Logger/Logger";
export { Transceiver } from "./ActuarTransceiver/Transceiver";
export { Server } from "./Server/Server";
export { ActuarLog } from "./Logger/ActuarLog";
export { Stats } from "./Statistics/Stats";
//#endregion