import { IActuarLog } from "../Actuar";
declare class ActuarLog {
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
    toString(): string;
    toJsonString(): string;
}
export { ActuarLog };
