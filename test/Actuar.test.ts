import * as Actuar from '../src/Actuar';
import { expect } from 'chai';
import { existsSync, rmdirSync, readdirSync, unlinkSync, statSync } from 'fs';
import { join, resolve, basename } from 'path';
import { tmpdir } from 'os';


const NEW_PATH = resolve(__dirname, '..', '..');

var deleteFolderRecursive = function (path) {
    if (existsSync(path)) {
        readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                unlinkSync(curPath);
            }
        });
        rmdirSync(path);
    }
};

before("Clean up test enivronment", (done) => {
    const actuarRoot = join(NEW_PATH, Actuar.moduleName);
    if(existsSync(join(NEW_PATH, Actuar.moduleName))){
        deleteFolderRecursive(actuarRoot);
        done();
    } else {
        done();
    }
});
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

    describe("enableDebug function", ()=> {
        it("Should enable the debug mode", (done) => {
            Actuar.enableDebug();
            expect(Actuar.ENV.DEBUG).to.be.true;
            Actuar.ENV.DEBUG = false;
            expect(Actuar.ENV.DEBUG).to.be.false;
            done();
        });
    });

    describe("setLocalPort function", () => {
        it("Should change the local port", (done) => {
            let oldPort = Actuar.ENV.LOCAL_PORT;
            Actuar.setLocalPort(9876);
            expect(Actuar.ENV.LOCAL_PORT).to.equal(9876);
            Actuar.setLocalPort(oldPort);
            expect(Actuar.ENV.LOCAL_PORT).to.equal(oldPort);
            done();
        });
    });
    describe("setRemotePort function", () => {
        it("Should change the local port", (done) => {
            let oldPort = Actuar.ENV.REMOTE_PORT;
            Actuar.setRemotePort(9876);
            expect(Actuar.ENV.REMOTE_PORT).to.equal(9876);
            Actuar.setRemotePort(oldPort);
            expect(Actuar.ENV.REMOTE_PORT).to.equal(oldPort);
            done();
        });
    });

    describe("setRemoteIp function", () => {
        it("Should change the local port", (done) => {
            let oldIp = Actuar.ENV.REMOTE_IP;
            Actuar.setRemoteIp("192.123.345");
            expect(Actuar.ENV.REMOTE_IP).to.equal("192.123.345");
            Actuar.setRemoteIp(oldIp);
            expect(Actuar.ENV.REMOTE_IP).to.equal(oldIp);
            done();
        });
    });

    describe("setRootDir function", () => {
        it("Should create a default dir named 'actuar' on start up in the tmp directory", (done) => {
            const PATH = resolve(join(tmpdir(), Actuar.moduleName));
            const exists = existsSync(PATH);
            expect(exists, `The Path ${PATH} seems not to exist.`).to.be.true;
            done()
        });
        it("Should create a new directory when calling the function", (done) => {
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