import chalk from 'chalk';
import { exists, mkdir, PathLike } from 'fs';
import { join } from 'path';

namespace ENV {
    export  const DEBUG = false;
}

export class Logger {
    protected _name: string = 'logger';
    protected static globalLogfilesDir: PathLike = join(__dirname, "logs");

    constructor(name: string) {
        this._name = name;
    }

    public static setGlobalLogfilesDir(dir: PathLike): void {
        var that = this;
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
        console.log(chalk.keyword('orange')(`[ ${timestamp} ] - ${instance} : ${message}`));
    }

    public warn(message: string, line?: number, file?: string): void {
        const timestamp = new Date().toLocaleTimeString();
        const instance = this.$name;
        let error: string = '';
        if (line && file) {
            error = `(${file}:${line})`;
        }
        console.log(
            chalk.red(`E! [ ${timestamp} ] - ${instance} : ${message} ${error}`)
        );
    }

    public error(message: string, line?: number, file?: string): void {
        const timestamp = new Date().toLocaleTimeString();
        const instance = this.$name;
        let error: string = '';
        if (line && file) {
            error = `(${file}:${line})`;
        }
        console.log(
            chalk.red(`E! [ ${timestamp} ] - ${instance} : ${message} ${error}`)
        );
    }

    public debug(message: string, line?: number, file?: string): void {
        if (ENV.DEBUG) {
            const timestamp = new Date().toLocaleTimeString();
            const instance = this.$name;
            let error: string = '';
            if (line && file) {
                error = `(${file}:${line})`;
            }
            console.log(
                chalk.yellow(`E! [ ${timestamp} ] - ${instance} : ${message} ${error}`)
            );
        }
    }
}
