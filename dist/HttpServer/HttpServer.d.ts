import { IActuarLog } from "../Actuar";
export declare type fileList = {
    [key: string]: string;
};
declare class Server {
    private static app;
    static getLogFiles(): Promise<fileList>;
    static getLogsFromFile(path: string): Promise<IActuarLog[]>;
    static listen(): void;
    private static startUpServer();
}
export { Server };
