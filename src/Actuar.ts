// * importing dependencies
//#region
import { PathLike, mkdir, existsSync, mkdirSync } from "fs";
import { resolve, join, basename } from "path";
import { tmpdir } from "os";
//#endregion

// * types, enums and interfaces
//#region
/**
 * Describes the depth of logging information.
 */
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
    Log = "Info"
}
export enum DataTypes {
    Table
}
export enum StatInterval {
    Hour,
    Day,
    Week
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
/**
 * Actuar.moduleName
 * @constant
 */
export const moduleName = "actuar";

export namespace ENV {
    export let REMOTE_IP: string = "localhost";
    export let REMOTE_PORT: number = 8989;
    export let LOCAL_PORT: number = 9090;
    export let HTTP_PORT: number = 9191;
    export let LOGLVL: LogLevel = LogLevel.ACTUAR;
    export let DEBUG: boolean = process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1;
    export let ROOT: PathLike = resolve(join(tmpdir(), moduleName));
}

existsSync(ENV.ROOT) ? null : mkdirSync(ENV.ROOT);

// import Actuar Logger for internal usage
import { Logger } from "./Actuar";

// * general setup and configuration functions
//#region
/**
 * Set the loglevel for all loggers.
 * @default LogLevel.Actuar
 * @param lvl
 */
export function setLogLevel(lvl: LogLevel): void {
    ENV.LOGLVL = lvl;
}
/**
 * Change the port number Actuar shall listen for remote logs.
 * @default 9090
 * @param port The number of the port to listen to.
 */
export function setLocalPort(port: number): void {
    ENV.LOCAL_PORT = port;
}
/**
 * Change the port the logger instances shall send logs when setup as remote loggers.
 * @default 8989
 * @param port The number of the port.
 */
export function setRemotePort(port: number): void {
    ENV.REMOTE_PORT = port;
}
/**
 * Change the IP-Address the logger instances shall send logs when setup as remote loggers.
 * @default "localhost"
 * @param ip 
 */
export function setRemoteIp(ip: string): void {
    ENV.REMOTE_IP = ip;
}

/**
 * Enables the debug mode of actuar. The default value depends on the arguments of the main process.
 * You can enable the debug mode on startup by passing the argument "--debug" or "-dbg".
 */
export function enableDebug(): void {
    ENV.DEBUG = true;
}

/**
 * Returns the absolute path of the actuar root directory.
 * Logfiles and plots will be saved in this directory.
 */
export function getRootDir(): PathLike {
    return ENV.ROOT;
}

/**
 * Setup a new root directory for logfiles and plots.
 * If the basename of the path is not "actuar", it will automatically added.
 * If the path does not exist, it will be created.
 * @default The temporary directory of the system.
 * @param dir The new path of the root directory.
 */
export function setRootDir(dir: PathLike): Promise<void> {
    return new Promise<void>((res, rej) => {
        dir = resolve(dir as string);
        if (basename(dir) !== moduleName) {
            dir = join(dir, moduleName);
        }
        createDirectory(dir).then((path) => {
            ENV.ROOT = path;
            res();
        });
    });
}
/**
 * A little helper function to create directories.
 * @param dir A directory path to create.
 */
export function createDirectory(dir: string): Promise<string> {
    return new Promise<string>((res, rej) => {
        if (!existsSync(dir)) {
            mkdir(dir, (err) => {
                if (err) {
                    if (ENV.LOGLVL === LogLevel.ACTUAR) {
                        new Logger(moduleName).unwritable().error(`Can not create directory ${dir}`);
                    }
                    res(tmpdir());
                } else {
                    res(dir as string);
                }
            });
        } else {
            res(dir as string);
        }
    });
}
//#endregion

//#region re-exporting modules
export { Logger } from "./Logger/Logger";
export { Transceiver } from "./ActuarTransceiver/Transceiver";
export { Server } from "./HttpServer/HttpServer";
export { ActuarLog } from "./Logger/ActuarLog";
export { Stats } from "./Statistics/Stats";
//#endregion
