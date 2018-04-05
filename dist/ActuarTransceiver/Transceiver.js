"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = require("dgram");
const Actuar_1 = require("../Actuar");
class Transceiver {
    static sendLog(log) {
        let message = Buffer.from(log.toJsonString());
        this.socket.send(message, 0, message.length, Actuar_1.ENV.REMOTE_PORT, Actuar_1.ENV.REMOTE_IP);
    }
    static logRemotes() {
        this.server.on('error', (err) => {
            new Actuar_1.Logger("actuar").unwritable().error(`Transceiver-Server error ${err.stack}`);
            this.server.close();
        });
        this.server.on('message', (msg) => {
            let aLog = Actuar_1.ActuarLog.fromBuffer(msg);
            let jLog = aLog.toJson();
            if (jLog.write)
                Actuar_1.Logger.writeOut(aLog);
            if (!jLog.muted)
                console.log(aLog.toString());
        });
        this.server.on('listening', () => {
            const address = this.server.address();
            new Actuar_1.Logger("actuar").unwritable().log(`server listening ${address.address}:${address.port}`);
        });
        this.server.bind(Actuar_1.ENV.LOCAL_PORT);
    }
}
Transceiver.socket = dgram.createSocket('udp4');
Transceiver.server = dgram.createSocket('udp4');
exports.Transceiver = Transceiver;
//# sourceMappingURL=Transceiver.js.map