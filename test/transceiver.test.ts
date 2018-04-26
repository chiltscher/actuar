import * as Actuar from '../src/Actuar';
import { expect } from 'chai';
import { after } from 'mocha';

describe("Actuar transceiver test", () => {
    it("Should send a message via UDP and the transceiver should receive it", (done) =>{
        // * remote port muss be local since we send to the same machine
        Actuar.setLogLevel(Actuar.LogLevel.INFO);
        Actuar.setRemotePort(9090);
        Actuar.setRemoteIp('localhost');
        const REMOTE_MSG = "Hello World! I'm the remote logger!";
        const REMOTE_NAME = "REMOTE";
        const remoteLogger = new Actuar.Logger(REMOTE_NAME).mute().remote();
        Actuar.Transceiver.logRemotes();
        Actuar.Transceiver.onLogReceived((log) => {
            var data = log.toJson();
            expect(data.message).to.equal(REMOTE_MSG);
            expect(data.instance).to.equal(REMOTE_NAME);
            done();
        });
        remoteLogger.log(REMOTE_MSG);
    });
    after("Set remoteport to default", () => {
        Actuar.setRemotePort(8989);
    });
});