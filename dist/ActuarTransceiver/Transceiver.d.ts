import { ActuarLog } from '../Actuar';
declare class Transceiver {
    private readonly socket;
    constructor();
    sendLog(log: ActuarLog): void;
}
export { Transceiver };
