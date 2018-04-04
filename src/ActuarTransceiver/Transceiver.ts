import * as dgram from 'dgram';
import { ActuarLog, ENV } from '../Actuar';

class Transceiver {
    private readonly socket: dgram.Socket = dgram.createSocket('udp4');
    constructor(){
        this.socket;
    }

    public sendLog(log: ActuarLog) {
        let message = Buffer.from(log.toJsonString());
        this.socket.send(message, 0, message.length, ENV.REMOTE_PORT, ENV.REMOTE_IP);
    }
}

export { Transceiver }