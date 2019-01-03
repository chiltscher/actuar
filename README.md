# Actuar 
[![Build Status](https://travis-ci.org/chiltscher/actuar.svg?branch=master)](https://travis-ci.org/chiltscher/actuar)

A Node.js module that provides colorized console outputs and more

## Installation
```sh
npm install actuar --save
```

## Usage

Actuar has some methods to configure the global log handling.

#### setLocalPort(port: number) : void
Set the port, Actuar shall listen on for remote logs.
Defaults to ``9090``.
```TypeScript
Actuar.setLocalPort(9876);
```

#### setRemotePort(port: number) : void
Set the port, Actuar shall send the logs to.
Defaults to ``8989``.
```TypeScript
Actuar.setRemotePort(9876);
```
#### setRemoteIp(ip: string) : void
Set the ip, Actuar shall send the logs to.
Defaults to ``"localhost"``.
```TypeScript
Actuar.setRemoteIp("192.154.100.201");
```

#### enableDebug() : void
Enables the debug mode.
With this enabled, all Actuar.Logger instances will output the Actuar.Logger.debug() - messages.
The default value depends on the passed arguments of your app.
It is automatically ``true`` if you pass ``"-dbg"`` or ``"--debug"``
```TypeScript
Actuar.enableDebug();
```
#### setLogfilesDir(dir: PathLike) : void
Set the directory, where Actuar shall save the logfiles.
Defaults to ``__dirname``.
```TypeScript
Actuar.setLogfilesDir("./myLogs");
```

#### getLogfilesDir() : PathLike
returns the absolute path to the logfiles directory.
```TypeScript
Actuar.getLogfilesDir());
```
## Actuar.Logger 
### Javascript
```Javascript
let Actuar = require('actuar');
let Logger = new Actuar.Logger('app');
Logger.error("Unexpected Data", 52, __filename);
```
```sh
# Output should be
E! [ 08:20:23 ] - APP : Unexpected Data (/path/to/your/application.js:52)
# (in red)
```

### TypeScript
```TypeScript
import * as Actuar from 'actuar';
let Logger = new Actuar.Logger('Server');
Logger.warn("Unathorized access!");
```

```sh
# Output should be
W! [ 08:09:55 ] - SERVER : Unathorized access!
# (in yellow)
```

#### log(message: string) : void
Standard output in orange.

#### warn(message: string, line?: number, file?: string): void
A warning message in yellow. Line number and a file can be specifed to give a link to the code, where the method was called.

#### error(message: string, line?: number, file?: string): void
An error message in red. Line number and a file can be specifed to give a link to the code, where the error occured.

#### debug(message: string, line?: number, file?: string): void
A debug message in yellow. Line number and a file can be specifed to give a link to the code, where the method was called.
It will be printed if the debug mode is ``true``.
(``Actuar.enableDebug()``);

#### mute() / unmute() - chainable
Enables / disables ``muting``.
Defaults to ``false``.
Muting will prevent the console output of the logger.

#### writable() / unwritable() - chainable
Enables / disables ``writing``.
Defaults to ``true``.
Unwritable will prevent the logger from writing the data into the logfile.

#### remote() / unremote() - chainable
Enables / disables ``remote``.
Defaults to ``false``.
Remote will cause the logger to send every log to a remote instance of Actuar.

## Remote Logging

If there are multiple devices that have to log data and information, the logger can be setup as remote logger.
The follwoing example will create a logger, that send it logs to 'localhost:9090'.
The Actuar instance on localhost parses incoming messages, saves the messages into a local logfile and print it out into the console. 
### Example
```TypeScript
import * as Actuar from "../src/Actuar";

Actuar.setLogfilesDir("./logs");
Actuar.setRemotePort(9090);
Actuar.setRemoteIp('localhost');
Actuar.Transceiver.logRemotes();

const Logger = new Actuar.Logger("sandbox").remote();
Logger.log("Hello World!");
```
