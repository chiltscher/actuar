import * as Actuar from '../src/Actuar';
import { expect } from 'chai';
import { existsSync } from 'fs';
import { join, resolve, basename } from 'path';
import { tmpdir } from 'os';

describe("Actuar Test", () => {
    it("Should have the const module name 'actuar'", (done) => {
        expect(Actuar.moduleName).to.equal("actuar");
        done();
    });

    it("Should export a namespace ENV", (done) => {
        expect(Actuar.ENV).to.be.not.null;
        done();
    });

    it("Should have the default remote_ip 'localhost'", (done) => {
        expect(Actuar.ENV.REMOTE_IP).to.equal("localhost");
        done();
    });

    it("Should have the default remote-, local-, and http-port", (done) => {
        expect(Actuar.ENV.REMOTE_PORT, `Remote port is ${Actuar.ENV.REMOTE_PORT} instead of 8989`).to.equal(8989);
        expect(Actuar.ENV.LOCAL_PORT, `Local port is ${Actuar.ENV.LOCAL_PORT} instead of 9090`).to.equal(9090);
        expect(Actuar.ENV.HTTP_PORT, `HTTP port is ${Actuar.ENV.HTTP_PORT} instead of 9191`).to.equal(9191);
        done();
    });

    it("Should have a default root-directory for saving data", (done) => {
        const dir = Actuar.getRootDir();
        expect(dir, `Root-Dir is ${dir} instead of ${Actuar.ENV.ROOT}`).to.equal(Actuar.ENV.ROOT);
        done();
    });

    it("Debug mode should be disabled by default", (done) => {
        expect(Actuar.ENV.DEBUG).to.be.false;
        done();
    });

    it("enableDebug() should turn on the debug-mode", (done) => {
        Actuar.enableDebug();
        expect(Actuar.ENV.DEBUG).to.be.true;
        Actuar.ENV.DEBUG = false;
        expect(Actuar.ENV.DEBUG).to.be.false;
        done();
    });

    describe("setRootDir function", () => {
        it("Should create a default dir named 'actuar' on start up in the tmp directory", (done) => {
            const PATH = resolve(join(tmpdir(), Actuar.moduleName));
            const exists = existsSync(PATH);
            expect(exists, `The Path ${PATH} seems not to exist.`).to.be.true;
            done()
        });
        it("Should create a new directory when calling the function", (done) => {
            const NEW_PATH = resolve(__dirname, '..', '..');
            const exists = existsSync(join(NEW_PATH, Actuar.moduleName));
            expect(exists, `The Path ${NEW_PATH} seems to exist already. Have you cleand up before the test?.`).to.be.false;
            Actuar.setRootDir(NEW_PATH).then(
                () => {
                    const dir = Actuar.getRootDir();
                    console.log(dir);
                    expect(dir).to.equal(join(NEW_PATH, Actuar.moduleName));
                    expect(basename(dir as string)).to.equal(Actuar.moduleName);
                    done()
                }
            );
        });
    });
})