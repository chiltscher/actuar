import { ActuarLog } from '../Actuar';
declare class Transceiver {
    private static readonly socket;
    private static readonly server;
    static sendLog(log: ActuarLog): void;
    static logRemotes(): void;
    private static fireLogReceivedCallbacks(aLog);
    private static _onLogReceivedCallbacks;
    static onLogReceived(callback: onLogReceivedCallback): void;
}
export declare type onLogReceivedCallback = (log: ActuarLog) => void;
export { Transceiver };
