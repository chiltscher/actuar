import * as Actuar from "../src/Actuar";
import { resolve } from "path";
import { basename } from "path";

function outputTest(){
    let me = new Actuar.Logger('Test');
    Actuar.Settings.Level = Actuar.LogLevel.ACTUAR;
    console.log(`ACTUAR: ${Actuar.LogLevel.ACTUAR}`);
    console.log(`INFO: ${Actuar.LogLevel.INFO}`);
    console.log(`WARN: ${Actuar.LogLevel.WARN}`);
    console.log(`ERROR: ${Actuar.LogLevel.ERROR}`);
    console.log(`CURRENT: ${Actuar.Settings.Level}`);
    Actuar.Settings.Level = Actuar.LogLevel.INFO;
    me.error("ERROR GOES HERE")
    me.log("INFO GOES HERE")
    console.log(`CURRENT: ${Actuar.Settings.Level}`);
    Actuar.Settings.Level = Actuar.LogLevel.WARN;
    console.log(`CURRENT: ${Actuar.Settings.Level}`);
    Actuar.Settings.Level = Actuar.LogLevel.ERROR;
    console.log(`CURRENT: ${Actuar.Settings.Level}`);
    Actuar.Settings.Level = Actuar.LogLevel.ACTUAR;
    console.log(`CURRENT: ${Actuar.Settings.Level}`);
    // console.log(`Current Level: ${Actuar.Settings.Level}`);
    // out();
    function out(){
        me.log("Log");
        me.warn("Warn");
        me.error("Error");
        me.debug("Debug");
    }
}
outputTest()
function remoteLoggerTest() {

    const NEW_PATH = resolve(__dirname, '..', '..');
    Actuar.setRootDir(NEW_PATH).then(
        () => {
            const dir = Actuar.getRootDir();
            console.log(dir);
        }
    );
    
    Actuar.setRootDir("./test/logfiles");
    Actuar.setRemotePort(9090);
    Actuar.setRemoteIp('localhost');
    Actuar.Server.listen();
    
    const remoteLogger = new Actuar.Logger("Remote").remote();
    const localLogger = new Actuar.Logger("local");
    
    Actuar.Transceiver.logRemotes();
    Actuar.Transceiver.onLogReceived((log) => {
        var data = log.toJson();
        localLogger.log(`I've got the message "${data.message}" from ${data.instance}`);
    });
    
    remoteLogger.log("Hello World! I'm the remote logger!");
}