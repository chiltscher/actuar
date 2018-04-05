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
        this.server.on('message', (msg, rinfo) => {
            console.log(msg);
        });
        this.server.on('listening', () => {
            const address = this.server.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
        this.server.bind(Actuar_1.ENV.LOCAL_PORT);
    }
}
Transceiver.socket = dgram.createSocket('udp4');
Transceiver.server = dgram.createSocket('udp4');
exports.Transceiver = Transceiver;
//# sourceMappingURL=Transceiver.js.map