import { Logger } from "../src/Actuar";
import { expect } from "chai"
import { join, resolve } from "path";



describe("Logger Test", () => {
    it("Should log a colorized message", (done) => {
        const appLog: Logger = new Logger('my application');
        appLog.log("has started successfull!");
        done();
    });

    it("Should be able to extend the Logger class", (done) => {
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
        done();
    });

    it("Should print out the file and the line where the error occurs", (done) => {
        const testLogger: Logger = new Logger('server');
        testLogger.error("Damn, an error occurred!", 35, __filename);
        done();
    });
});