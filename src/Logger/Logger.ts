import { Settings, IActuarLog, LogType, LogLevel, Stats, createDirectory } from '../Actuar';
import { ActuarLog } from './ActuarLog';
import { appendFile, existsSync } from 'fs';
import { join } from 'path';
import { Transceiver } from '../Actuar';

export class Logger {
    // protected static DBG: boolean = false;
    protected _name: string = "logger";
    protected _muted: boolean = false;
    public mute(): Logger {
        this._muted = true;
        return this;
    }
    public unmute(): Logger {
        this._muted = false;
        return this;
    }
    protected _write: boolean = true;
    public writable(): Logger {
        this._write = true;
        return this;
    }
    public unwritable(): Logger {
        this._write = false;
        return this;
    }
    protected _remote: boolean = false;
    public remote(): Logger {
        this._remote = true;
        return this;
    }
    public unremote(): Logger {
        this._remote = false;
        return this;
    }

    constructor(name: string) {
        this._name = name;
    }
    public static get DIR(): string { 
        return join(Settings.Root as string, "logfiles") 
    };
    public static readonly EXT: string = ".aLog";
    public static writeOut(log: ActuarLog) {
        if (!existsSync(Logger.DIR)) {
            createDirectory(Logger.DIR).then(() => Logger.writeOut(log));
        } else {
            let FILE = join(Logger.DIR, new Date().toLocaleDateString()) + Logger.EXT;
            appendFile(FILE, log.stringify() + ",\r\n",()=>{});
        }
    }

    public get name(): string {
        return this._name;
    }

    public get instance(): string {
        let instance = this._name.toUpperCase();
        while (instance.includes(" ")) {
            instance = instance.replace(" ", "-");
        }
        return instance;
    }

    public log(message: string): void {
        if(Settings.Level < LogLevel.INFO) return;
        let log: IActuarLog = {
            muted: this._muted,
            write: this._write,
            instance: this.instance,
            timestamp: new Date(),
            message: message,
            type: LogType.Log
        };
        const aLog = new ActuarLog(log);
        if(this._remote) Transceiver.sendLog(aLog);
        if(this._write) Logger.writeOut(aLog);
        if (!this._muted) console.log(aLog.getMessage());
        Stats.Logs.inc();
    }

    public warn(message: string, line?: number, file?: string): void {
        if (Settings.Level < LogLevel.WARN) return;
        let log: IActuarLog = {
            muted: this._muted,
            write: this._write,
            instance: this.instance,
            timestamp: new Date(),
            line: line,
            file: file,
            message: message,
            type: LogType.Warning
        };
        const aLog = new ActuarLog(log);
        if(this._remote) Transceiver.sendLog(aLog);
        if(this._write) Logger.writeOut(aLog);
        if (!this._muted) console.log(aLog.getMessage());
        Stats.Warnings.inc();
    }

    public error(message: string, line?: number, file?: string): void {
        if (Settings.Level < LogLevel.ERROR) return;
        let log : IActuarLog = {
            muted: this._muted,
            write: this._write,
            instance: this.instance,
            timestamp: new Date(),
            line: line,
            file: file,
            message: message,
            type: LogType.Error
        };
        const aLog = new ActuarLog(log);
        if(this._write) Logger.writeOut(aLog);
        if(!this._muted) console.log(aLog.getMessage());
        Stats.Errors.inc();
    }

    public debug(message: string, line?: number, file?: string): void {
        if (Settings.Level < LogLevel.DEBUG || !Settings.Debug) return;
        let log: IActuarLog = {
            muted: this._muted,
            write: this._write,
            instance: this.instance,
            timestamp: new Date(),
            line: line,
            file: file,
            message: message,
            type: LogType.Debug
        };
        const aLog = new ActuarLog(log);
        if(this._remote) Transceiver.sendLog(aLog);
        if(this._write) Logger.writeOut(aLog);
        if (!this._muted) console.log(aLog.getMessage());
    }
}
