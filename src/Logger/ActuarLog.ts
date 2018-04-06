import chalk from "chalk";
import { PathLike } from "fs";
import { IActuarLog, LogType } from "../Actuar";

class ActuarLog {
    private readonly kindOf: string = "aLog";
    private instance: string;
    private type: LogType;
    private message: string;
    private timestamp: Date;
    private line?: number;
    private file?: PathLike;
    private write?: boolean;
    private muted?: boolean;
    private colorize: Function;
    constructor(log: IActuarLog){
        this.instance = log.instance;
        this.type = log.type;
        this.message = log.message;
        this.timestamp = new Date(Date.parse(log.timestamp.toString()));
        this.line = log.line;
        this.file = log.file;
        this.muted = log.muted;
        this.write = log.write;

        switch(this.type){
            case LogType.Log:
                this.colorize = chalk.keyword('orange');
                break;
            case LogType.Warning:
                this.colorize = chalk.yellow
                break;
            case LogType.Debug:
                this.colorize = chalk.yellow
                break;
            case LogType.Error:
                this.colorize = chalk.red
                break;
            default:
                this.colorize = chalk.keyword('orange');
        }
    }
    public toJson() : IActuarLog {
        return {
            kindOf: this.kindOf,
            instance: this.instance,
            type: this.type,
            message: this.message,
            timestamp: this.timestamp.toLocaleTimeString(),
            line: this.line,
            file: this.file,
            muted: this.muted,
            write: this.write
        }
    }
    public toString() : string {
        let error = "";
        if(this.line && this.file){
            error = `(${this.file}:${this.line})`;
        }
        return this.colorize(`[${ this.timestamp.toLocaleTimeString()}] - ${ this.instance } ${this.type.toUpperCase()} : ${ this.message } ${ error }`);
        // [ 08:20:23 ] - APP : Unexpected Data (/path/to/your/application.js:52)
    }
    public toJsonString() : string {
        return JSON.stringify(this.toJson());
    }
    public static fromBuffer(buffer: Buffer) : ActuarLog{
        let data : IActuarLog = JSON.parse(buffer.toString());
        return new ActuarLog(data);
    }
}

export { ActuarLog }