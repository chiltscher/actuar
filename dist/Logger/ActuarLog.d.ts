/// <reference types="node" />
import { IActuarLog } from "../Actuar";
declare class ActuarLog {
    private readonly kindOf;
    private instance;
    private type;
    private message;
    private timestamp;
    private line?;
    private file?;
    private write?;
    private muted?;
    private colorize;
    constructor(log: IActuarLog);
    toJson(): IActuarLog;
    getMessage(): string;
    stringify(): string;
    static fromBuffer(buffer: Buffer): ActuarLog;
}
export { ActuarLog };
