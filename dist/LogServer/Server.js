"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const Actuar_1 = require("../Actuar");
const path_1 = require("path");
class Server {
    static fileList() {
        return new Promise((res, rej) => {
            fs_1.readdir(Actuar_1.ENV.DIR, (err, files) => {
                if (err) {
                    new Actuar_1.Logger("actuar").unwritable().error("Can not read logfiles directory");
                    rej();
                }
                else {
                    let result = [];
                    files.forEach(file => {
                        if (path_1.extname(file) === Actuar_1.Logger.extension) {
                            let path = path_1.resolve(path_1.join(Actuar_1.ENV.DIR, file));
                            result.push(path);
                        }
                    });
                    res(result);
                }
            });
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map