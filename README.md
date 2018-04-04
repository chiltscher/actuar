# Actuar
A Node.js module that provides colorized console outputs and more

## Installation
```sh
npm install actuar --save
```

## Usage
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