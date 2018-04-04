/// <reference types="node" />
import { PathLike } from "fs";
export { Logger } from "./Logger/Logger";
export declare enum LogLevel {
    INFO = 0,
    WARN = 1,
    ERROR = 2,
    DEBUG = 3,
}
export declare enum LogType {
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
export declare namespace ENV {
    let LOGLVL: LogLevel;
    let DEBUG: boolean;
    let DIR: PathLike;
}
export declare function enableDebug(): void;
export declare function getLogfilesDir(): PathLike;
export declare function setLogfilesDir(dir: PathLike): void;
