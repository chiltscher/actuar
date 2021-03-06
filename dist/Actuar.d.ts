/// <reference types="node" />
import { PathLike } from "fs";
export declare enum LogLevel {
    INFO = 0,
    WARN = 1,
    ERROR = 2,
    DEBUG = 3,
    ACTUAR = 4,
}
export declare enum LogType {
    Error = "Error",
    Warning = "Warning",
    Debug = "Debug",
    Log = "Info",
}
export declare enum DataTypes {
    Table = 0,
}
export declare enum StatInterval {
    Hour = 0,
    Day = 1,
    Week = 2,
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
export declare const moduleName = "actuar";
export declare namespace Settings {
    let RemoteIp: string;
    let RemotePort: number;
    let LocalPort: number;
    let HttpPort: number;
    let Level: LogLevel;
    let Debug: boolean;
    let Root: PathLike;
}
export declare function setLocalPort(port: number): void;
export declare function setRemotePort(port: number): void;
export declare function setRemoteIp(ip: string): void;
export declare function enableDebug(): void;
export declare function setLogLevel(lvl: LogLevel): void;
export declare function getRootDir(): PathLike;
export declare function setRootDir(dir: PathLike): Promise<void>;
export declare function createDirectory(dir: string): Promise<string>;
export { Logger } from "./Logger/Logger";
export { Transceiver } from "./ActuarTransceiver/Transceiver";
export { Server } from "./HttpServer/HttpServer";
export { ActuarLog } from "./Logger/ActuarLog";
export { Stats } from "./Statistics/Stats";
