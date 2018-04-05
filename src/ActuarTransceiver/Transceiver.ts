import * as dgram from 'dgram';
import { ActuarLog, ENV, Logger } from '../Actuar';

class Transceiver {
    private static readonly socket: dgram.Socket = dgram.createSocket('udp4');
    private static readonly server: dgram.Socket = dgram.createSocket('udp4');

    public static sendLog(log: ActuarLog) {
        let message = Buffer.from(log.toJsonString());
        this.socket.send(message, 0, message.length, ENV.REMOTE_PORT, ENV.REMOTE_IP);
    }

    public static logRemotes() {
        this.server.on('error', (err) => {
            new Logger("actuar").unwritable().error(`Transceiver-Server error ${err.stack}`);
            this.server.close();
        });

        this.server.on('message', (msg) => {
            let aLog = ActuarLog.fromBuffer(msg);
            let jLog = aLog.toJson();
            if (jLog.write) Logger.writeOut(aLog);
            if (!jLog.muted) console.log(aLog.toString());
            this.fireLogReceivedCallbacks(aLog);
        });

        this.server.on('listening', () => {
            const address = this.server.address();
            new Logger("actuar").unwritable().log(`server listening ${address.address}:${address.port}`);
        });

        this.server.bind(ENV.LOCAL_PORT);
    }
    private static fireLogReceivedCallbacks(aLog: ActuarLog) : void {
        this._onLogReceivedCallbacks.forEach(callback => {
            callback(aLog);
        });
    }
    private static _onLogReceivedCallbacks: onLogReceivedCallback[] = []; 
    public static onLogReceived(callback: onLogReceivedCallback) {
        this._onLogReceivedCallbacks.push(callback);
    }
}

type onLogReceivedCallback = (log : ActuarLog) => void;

export { Transceiver }