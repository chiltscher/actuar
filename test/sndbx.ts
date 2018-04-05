import * as Actuar from "../src/Actuar";

Actuar.setLogfilesDir("./test/logfiles");
Actuar.setRemotePort(9090);
Actuar.setRemoteIp('localhost');
Actuar.Transceiver.logRemotes();

const Logger = new Actuar.Logger("sandbox").remote();
Logger.log("Hello World!");

Actuar.Server.fileList().then(files => {
    Actuar.Server.getLogsFromFile(files[0]).then(result => {debugger;})
});