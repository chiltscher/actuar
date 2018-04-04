import * as dgram from 'dgram';

class Transceiver {
    private readonly socket: dgram.Socket = dgram.createSocket('udp4');
    constructor(){
        this.socket;
    }
}

export { Transceiver }