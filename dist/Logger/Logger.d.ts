/// <reference types="node" />
import { PathLike } from 'fs';
export declare class Logger {
    private static DEBUG;
    protected _name: string;
    protected static globalLogfilesDir: PathLike;
    constructor(name: string);
    static setGlobalLogfilesDir(dir: PathLike): void;
    readonly name: string;
    private readonly $name;
    log(message: string): void;
    warn(message: string, line?: number, file?: string): void;
    error(message: string, line?: number, file?: string): void;
    debug(message: string, line?: number, file?: string): void;
}
