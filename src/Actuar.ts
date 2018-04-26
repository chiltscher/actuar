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

export namespace Settings {
    export let RemoteIp: string = "localhost";
    export let RemotePort: number = 8989;
    export let LocalPort: number = 9090;
    export let HttpPort: number = 9191;
    export let Level: LogLevel = LogLevel.ACTUAR;
    export let Debug: boolean = (process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1);
    export let Root: PathLike = resolve(join(tmpdir(), moduleName));
}

existsSync(Settings.Root) ? null : mkdirSync(Settings.Root);

// import Actuar Logger for internal usage
import { Logger } from "./Actuar";

//#region general setup and configuration functions
export function setLocalPort(port: number) : void {
    Settings.LocalPort = port;
}

export function setRemotePort(port: number) : void {
    Settings.RemotePort = port;
}

export function setRemoteIp(ip: string) : void {
    Settings.RemoteIp = ip;
}

export function enableDebug(): void { Settings.Debug = true; };

/**
 * Returns the absolute path of the actuar root directory.
 * Logfiles and plots will be saved in this directory.
 */
export function getRootDir(): PathLike {
    return Settings.Root;
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
        createDirectory(dir).then(
            path => { Settings.Root = path; res(); }
        );
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
                    if(Settings.Level === LogLevel.ACTUAR) {
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
