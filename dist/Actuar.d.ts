/// <reference types="node" />
import { PathLike } from "fs";
export { ActuarLog } from "./Logger/ActuarLog";
export { Logger } from "./Logger/Logger";
export declare enum LogLevel {
    INFO = 0,
    WARN = 1,
    ERROR = 2,
    DEBUG = 3,
    ALL = 4,
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
    let REMOTE_IP: string;
    let REMOTE_PORT: number;
    let LOGLVL: LogLevel;
    let DEBUG: boolean;
    let DIR: PathLike;
}
export declare function enableDebug(): void;
export declare function getLogfilesDir(): PathLike;
export declare function setLogfilesDir(dir: PathLike): Promise<void>;
