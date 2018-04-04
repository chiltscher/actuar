"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = require("dgram");
class Transceiver {
    constructor() {
        this.socket = dgram.createSocket('udp4');
        this.socket;
    }
}
exports.Transceiver = Transceiver;
