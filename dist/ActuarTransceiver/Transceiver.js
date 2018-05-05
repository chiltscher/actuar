"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = require("dgram");
const Actuar_1 = require("../Actuar");
class Transceiver {
    static sendLog(log) {
        let message = Buffer.from(log.stringify());
        this.socket.send(message, 0, message.length, Actuar_1.Settings.RemotePort, Actuar_1.Settings.RemoteIp);
    }
    static logRemotes() {
        this.server.on('error', (err) => {
            if (Actuar_1.Settings.Level < Actuar_1.LogLevel.ACTUAR)
                return;
            new Actuar_1.Logger("actuar").unwritable().error(`Transceiver-Server error ${err.stack}`);
            this.server.close();
        });
        this.server.on('message', (msg) => {
            let aLog = Actuar_1.ActuarLog.fromBuffer(msg);
            let jLog = aLog.toJson();
            if (jLog.write)
                Actuar_1.Logger.writeOut(aLog);
            if (!jLog.muted)
                console.log(aLog.getMessage());
            this.fireLogReceivedCallbacks(aLog);
        });
        this.server.on('listening', () => {
            const address = this.server.address();
            if (Actuar_1.Settings.Level < Actuar_1.LogLevel.ACTUAR)
                return;
            new Actuar_1.Logger("actuar").unwritable().log(`server listening ${address.address}:${address.port}`);
        });
        this.server.bind(Actuar_1.Settings.LocalPort);
    }
    static fireLogReceivedCallbacks(aLog) {
        this._onLogReceivedCallbacks.forEach(callback => {
            callback(aLog);
        });
    }
    static onLogReceived(callback) {
        this._onLogReceivedCallbacks.push(callback);
    }
}
Transceiver.socket = dgram.createSocket('udp4');
Transceiver.server = dgram.createSocket('udp4');
Transceiver._onLogReceivedCallbacks = [];
exports.Transceiver = Transceiver;
