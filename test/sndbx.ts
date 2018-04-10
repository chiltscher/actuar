import * as Actuar from "../src/Actuar";

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

// Actuar.Server.fileList().then(files => {
//     Actuar.Server.getLogsFromFile(files[0]).then(result => {debugger;})
// });