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

    it("Should export a namespace Settings", (done) => {
        expect(Actuar.Settings).to.be.not.null;
        done();
    });

    it("Should have the default RemoteIp 'localhost'", (done) => {
        expect(Actuar.Settings.RemoteIp).to.equal("localhost");
        done();
    });

    it("Should have the default remote-, local-, and http-port", (done) => {
        expect(Actuar.Settings.RemotePort, `Remote port is ${Actuar.Settings.RemotePort} instead of 8989`).to.equal(8989);
        expect(Actuar.Settings.LocalPort, `Local port is ${Actuar.Settings.LocalPort} instead of 9090`).to.equal(9090);
        expect(Actuar.Settings.HttpPort, `HTTP port is ${Actuar.Settings.HttpPort} instead of 9191`).to.equal(9191);
        done();
    });

    it("Should have a default Root-directory for saving data", (done) => {
        const dir = Actuar.getRootDir();
        expect(dir, `Root-Dir is ${dir} instead of ${Actuar.Settings.Root}`).to.equal(Actuar.Settings.Root);
        done();
    });

    it("Debug mode should be disabled by default", (done) => {
        expect(Actuar.Settings.Debug).to.be.false;
        done();
    });

    describe("enableDebug function", ()=> {
        it("Should enable the Debug mode", (done) => {
            Actuar.enableDebug();
            expect(Actuar.Settings.Debug).to.be.true;
            Actuar.Settings.Debug = false;
            expect(Actuar.Settings.Debug).to.be.false;
            done();
        });
    });

    describe("setLocalPort function", () => {
        it("Should change the local port", (done) => {
            let oldPort = Actuar.Settings.LocalPort;
            Actuar.setLocalPort(9876);
            expect(Actuar.Settings.LocalPort).to.equal(9876);
            Actuar.setLocalPort(oldPort);
            expect(Actuar.Settings.LocalPort).to.equal(oldPort);
            done();
        });
    });
    describe("setRemotePort function", () => {
        it("Should change the local port", (done) => {
            let oldPort = Actuar.Settings.RemotePort;
            Actuar.setRemotePort(9876);
            expect(Actuar.Settings.RemotePort).to.equal(9876);
            Actuar.setRemotePort(oldPort);
            expect(Actuar.Settings.RemotePort).to.equal(oldPort);
            done();
        });
    });

    describe("setRemoteIp function", () => {
        it("Should change the local port", (done) => {
            let oldIp = Actuar.Settings.RemoteIp;
            Actuar.setRemoteIp("192.123.345");
            expect(Actuar.Settings.RemoteIp).to.equal("192.123.345");
            Actuar.setRemoteIp(oldIp);
            expect(Actuar.Settings.RemoteIp).to.equal(oldIp);
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