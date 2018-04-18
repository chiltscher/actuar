# Class Actuar.Logger

## Description

The Actuar.Logger allows you to log informations, warnings, errors and debug points. It will generate a colorized console output, write the data into a file and sends the data to a remote actuar.

## Usage

```TypeScript
import { Logger } from 'actuar';

const appLog : Logger = new Logger('my application');
appLog.log("has started successfull!");

```

The upper code will lead to the following output:

<span style="color:yellow">[13:02:35] - MY-APPLICATION INFO : has started successful!</span>

---

If your application consists of many submodules, to extend the Logger class is a good way.

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
The code will generate the console output:

<span style="color:yellow">[13:19:06] - VISITERCOUNTER WARNING : There is a new visitor!</span>

---