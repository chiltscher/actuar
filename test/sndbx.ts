import * as Actuar from "../src/Actuar";

Actuar.setLogfilesDir("./logs");
Actuar.setRemotePort(9090);
Actuar.setRemoteIp('localhost');
Actuar.Transceiver.logRemotes();

const Logger = new Actuar.Logger("sandbox").remote();
Logger.log("Hello World!");