export { Logger } from "./Logger/Logger";
export namespace ENV {
    export let DEBUG: boolean = (process.argv.indexOf("-dbg") !== -1 || process.argv.indexOf("--debug") !== -1);
}
export function enableDebug(): void { ENV.DEBUG = true; };