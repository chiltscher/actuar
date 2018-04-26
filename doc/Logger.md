# Class Actuar.Logger

## Description

The Actuar.Logger allows you to log informations, warnings, errors and debug points. It will generate a colorized console output, write the data into a file and sends the data to a remote actuar.

## Usage

```TypeScript
import { Logger } from 'actuar';

const appLog : Logger = new Logger('my application');
appLog.log("has started successfull!");

```

The upper code will lead to the following output (yellow colorized as far the console supports it):

<span style="color:yellow">[13:02:35] - MY-APPLICATION INFO : has started successful!</span>

---

If your application consists of many submodules, to extend the Logger class is a good way.

## Extend Logger-Class
```TypeScript
class VisiterCounter extends Logger {
    private static readonly className: string = "VisiterCounter";
    private numberOfVisitors: number = 0;
    constructor() {
        super(VisiterCounter.className);
        //...
    }
    public increaseVisitors(): void {
        this.numberOfVisitors++;
        this.warn("There is a new visitor!");
    }
}

const counter = new VisiterCounter();
counter.increaseVisitors();
}
```
The code will generate the yellow colorized console output :

<span style="color:yellow">[13:19:06] - VISITERCOUNTER WARNING : There is a new visitor!</span>

---

## Printing errors

If you printing errors, you will be able to pass the line and the filename to the Logger.error-method. It also works with warning and debug outputs.

```TypeScript
const testLogger: Logger = new Logger('server');
testLogger.error("Damn, an error occurred!", 35, __filename);
```
The code will generate the red colorized console output :

<span style="color:red">[08:34:32] - SERVER ERROR : Damn, an error occurred! (/absolute/path/to/script.js:35)</span>

## Output handling

There are some methods, you can control the output of single instances with. All of these methods are chainable.

### mute / unmute
If there is no need to print the logs to your console and you just want them to write into the logfile, you can use the `mute()` Method. This will also prevent the console output on the server, if this logger is setup as remote logger. `unmute()` will cancel the output prevention.

### writeable / unwritable
If you just want to write to the console and not into the logfile, you can prevent the write process of the logger with `unwritable()`. `writable()` will cancel the setting and the logger keeps on with writing into the logfile.

### remote / unremote()
Imagine you are working on a smart home project. So you have got a Raspberry Pi with temperature sensors and so on in your garden (A), a second one in your basement (B) and a third one in your living room (C).
You simply can setup the logger instances on A and B as remote-logger with the `remote()` method. [Setup the ip and port](./Actuar.md#remote-logging) on A and B and start the [Transceiver](./Transceiver.md) on C.

Now, all logs, warnings, errors and debugs from A and B will be sent to C with UDP messages and you have got them at one place.