import { ENV, IActuarLog, LogType, LogLevel } from '../Actuar';
import { ActuarLog } from './ActuarLog';
import { appendFile } from 'fs';
import { join } from 'path';
import { Transceiver } from '../Actuar';

export class Logger {
    // protected static DBG: boolean = false;
    protected _name: string = 'logger';
    protected _muted: boolean = false;
    public mute():Logger { this._muted = true; return this; }
    public unmute():Logger { this._muted = false; return this; }
    protected _write: boolean = true;
    public writable(): Logger { this._write = true; return this; }
    public unwritable(): Logger { this._write = false; return this; }
    protected _remote: boolean = false;
    public remote(): Logger { this._remote = true; return this; }
    public unremote(): Logger { this._remote = false; return this; }

    constructor(name: string) {
        this._name = name;
    }
    public static extension: string = ".aLog";
    public static writeOut(log: ActuarLog) {
        let FILE = join(ENV.LOGDIR as string, new Date().toLocaleDateString()) + Logger.extension;
        appendFile(FILE, log.toJsonString() + ",\r\n",()=>{});
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
            type: LogType.Log
        }
        const aLog = new ActuarLog(log);
        if(this._remote) Transceiver.sendLog(aLog);
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
            type: LogType.Warning
        }
        const aLog = new ActuarLog(log);
        if(this._remote) Transceiver.sendLog(aLog);
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
            type: LogType.Debug
        }
        const aLog = new ActuarLog(log);
        if(this._remote) Transceiver.sendLog(aLog);
        if(this._write) Logger.writeOut(aLog);
        if (!this._muted) console.log(aLog.toString());
    }
}
