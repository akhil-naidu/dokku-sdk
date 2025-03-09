import { SSHConfig } from './modules/BaseModule';
import { Apps } from './modules/Apps';
import { Logs } from './modules/Logs';
import { Proxy } from './modules/Proxy';
export declare class DokkuSDK {
    apps: Apps;
    logs: Logs;
    proxy: Proxy;
    constructor(config: SSHConfig);
    disconnect(): Promise<void>;
}
