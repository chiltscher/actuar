import * as Actuar from "../src/Actuar";
import { expect } from "chai"
import { join, resolve } from "path";
describe("Logger Test", () => {
    let Logger: Actuar.Logger;
    const dirPath = resolve(join(__dirname, "..", ".."));
    before("Reset the Actuar Statistics", (done) => {
        Actuar.Stats.reset();
        done();
    });
    it("Actuar stats should be 0", (done) => {
        expect(Actuar.Stats.Outs).to.equal(0);
        done();
    });

    it("Should create an instance of a new logger", (done) => {
        Logger = new Actuar.Logger("Test-logger");
        done()
    });

    it("Debug mode should be false", (done) => {
        expect(Actuar.ENV.DEBUG).to.be.false;
        done()
    });

    it("Debug mode should be enabled", (done) => {
        Actuar.enableDebug();
        expect(Actuar.ENV.DEBUG).to.be.true;
        done()
    });
    

    it("Should throw no error when logging (there should be no visible output because its muted)", () => {
        Logger.mute();
        Logger.log("This is just a test");
        Logger.warn("This is just a test", 12, __filename);
        Logger.error("This is just a test", 13, __filename);
        Logger.debug("This is just a test", 14, __filename);
        expect(Actuar.Stats.Outs).to.equal(3);
    });
    // it("Should output the example for GitHub", () => {
    //     let Logger = new Actuar.Logger('Server');
    //     Logger.error("Unexpected Data", 2, __filename);
    //     Logger.warn("Unathorized access!");
    // });
});