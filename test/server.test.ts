import * as Actuar from "../src/Actuar";
import { join, resolve } from "path";
import { expect } from "chai";
describe("Actuar server test", () => {
    let Logger: Actuar.Logger;

    it("Create a test file at first", (done) => {
        Logger = new Actuar.Logger("Test-logger").mute();
        Logger.log(__filename);
        Logger.warn("This is just a test");
        done();
    });

    it("Should get a list with at least one file", (done) => {
        Actuar.Server.getLogFiles().then((fileList) => {
            expect(fileList.length).not.to.equal(0);
            done();
        });
    });
});