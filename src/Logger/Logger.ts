import chalk from 'chalk';
import { exists, mkdir, PathLike } from 'fs';
import { join } from 'path';
import { ENV } from '../Actuar';

export class Logger {
    // protected static DBG: boolean = false;
    protected _name: string = 'logger';
    protected _muted: boolean = false;
    public mute():void { this._muted = true }
    public unmute():void { this._muted = false }
    protected static globalLogfilesDir: PathLike = join(__dirname, "logs");

    constructor(name: string) {
        this._name = name;
    }

    public static setGlobalLogfilesDir(dir: PathLike): void {
        exists(dir, exists => {
            if (!exists) {
                mkdir(dir, err => {
                    if (err)
                        console.log(
                            `Could not create directory for logfiles, using default instead`
                        );
                });
            }
        });
    }

    public get name(): string {
        return this._name;
    }

    private get $name(): string {
        return this._name.toUpperCase();
    }

    public log(message: string): void {
        const timestamp = new Date().toLocaleTimeString();
        const instance = this.$name;
        const out = chalk.keyword('orange')(`[ ${timestamp} ] - ${instance} : ${message}`);
        if(!this._muted) console.log(out);
    }

    public warn(message: string, line?: number, file?: string): void {
        const timestamp = new Date().toLocaleTimeString();
        const instance = this.$name;
        let error: string = '';
        if (line && file) {
            error = `(${file}:${line})`;
        }
        const out = chalk.yellow(`W! [ ${timestamp} ] - ${instance} : ${message} ${error}`);
        if(!this._muted) console.log(out);
    }

    public error(message: string, line?: number, file?: string): void {
        const timestamp = new Date().toLocaleTimeString();
        const instance = this.$name;
        let error: string = '';
        if (line && file) {
            error = `(${file}:${line})`;
        }
        const out = chalk.red(`E! [ ${timestamp} ] - ${instance} : ${message} ${error}`);
        if(!this._muted) console.log(out);
    }

    public debug(message: string, line?: number, file?: string): void {
        if (ENV.DEBUG) {
            const timestamp = new Date().toLocaleTimeString();
            const instance = this.$name;
            let error: string = '';
            if (line && file) {
                error = `(${file}:${line})`;
            }
            const out = chalk.yellow(`E! [ ${timestamp} ] - ${instance} : ${message} ${error}`);
            if(!this._muted) console.log(out);
        }
    }
}
