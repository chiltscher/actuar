"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = require("dgram");
const Actuar_1 = require("../Actuar");
class Transceiver {
    constructor() {
        this.socket = dgram.createSocket('udp4');
        this.socket;
    }
    sendLog(log) {
        let message = Buffer.from(log.toJsonString());
        this.socket.send(message, 0, message.length, Actuar_1.ENV.REMOTE_PORT, Actuar_1.ENV.REMOTE_IP);
    }
}
exports.Transceiver = Transceiver;
