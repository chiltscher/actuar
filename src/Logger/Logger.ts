import { ENV, IActuarLog, LogType, LogLevel } from '../Actuar';
import { ActuarLog } from './ActuarLog';
import { appendFile } from 'fs';
import { join } from 'path';

export class Logger {
    // protected static DBG: boolean = false;
    protected _name: string = 'logger';
    protected _muted: boolean = false;
    public mute():void { this._muted = true }
    public unmute():void { this._muted = false }
    protected _write: boolean = true;
    public writable(): void { this._write = true }
    public unwritable(): void { this._write = false }

    constructor(name: string) {
        this._name = name;
    }
    private static extension: string = ".aLog";
    public static writeOut(log: ActuarLog) {
        let FILE = join(ENV.DIR as string, new Date().toLocaleDateString()) + Logger.extension;
        appendFile(FILE, log.toJsonString(),()=>{});
    }

    public get name(): string {
        return this._name;
    }

    private get $name(): string {
        return this._name.toUpperCase();
    }

    public log(message: string): void {
        if(ENV.LOGLVL < LogLevel.INFO) return;
        let log: IActuarLog = {
            muted: this._muted,
            write: this._write,
            instance: this.$name,
            timestamp: new Date(),
            message: message,
            type: LogType.Error
        }
        const aLog = new ActuarLog(log);
        if(this._write) Logger.writeOut(aLog);
        if (!this._muted) console.log(aLog.toString());
    }

    public warn(message: string, line?: number, file?: string): void {
        if (ENV.LOGLVL < LogLevel.WARN) return;
        let log: IActuarLog = {
            muted: this._muted,
            write: this._write,
            instance: this.$name,
            timestamp: new Date(),
            line: line,
            file: file,
            message: message,
            type: LogType.Error
        }
        const aLog = new ActuarLog(log);
        if(this._write) Logger.writeOut(aLog);
        if (!this._muted) console.log(aLog.toString());
    }

    public error(message: string, line?: number, file?: string): void {
        if (ENV.LOGLVL < LogLevel.ERROR) return;
        let log : IActuarLog = {
            muted: this._muted,
            write: this._write,
            instance: this.$name,
            timestamp: new Date(),
            line: line,
            file: file,
            message: message,
            type: LogType.Error
        }
        const aLog = new ActuarLog(log);
        if(this._write) Logger.writeOut(aLog);
        if(!this._muted) console.log(aLog.toString());
    }

    public debug(message: string, line?: number, file?: string): void {
        if (ENV.LOGLVL < LogLevel.DEBUG || !ENV.DEBUG) return;
        let log: IActuarLog = {
            muted: this._muted,
            write: this._write,
            instance: this.$name,
            timestamp: new Date(),
            line: line,
            file: file,
            message: message,
            type: LogType.Error
        }
        const aLog = new ActuarLog(log);
        if(this._write) Logger.writeOut(aLog);
        if (!this._muted) console.log(aLog.toString());
    }
}
