import { ActuarLog } from '../Actuar';
declare class Transceiver {
    private static readonly socket;
    private static readonly server;
    static sendLog(log: ActuarLog): void;
    static logRemotes(): void;
}
export { Transceiver };
