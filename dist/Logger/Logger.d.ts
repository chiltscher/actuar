import { ActuarLog } from './ActuarLog';
export declare class Logger {
    protected _name: string;
    protected _muted: boolean;
    mute(): void;
    unmute(): void;
    protected _write: boolean;
    writable(): void;
    unwritable(): void;
    constructor(name: string);
    private static extension;
    static writeOut(log: ActuarLog): void;
    readonly name: string;
    private readonly $name;
    log(message: string): void;
    warn(message: string, line?: number, file?: string): void;
    error(message: string, line?: number, file?: string): void;
    debug(message: string, line?: number, file?: string): void;
}
