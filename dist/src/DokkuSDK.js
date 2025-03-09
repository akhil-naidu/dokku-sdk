"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DokkuSDK = void 0;
const Apps_1 = require("./modules/Apps");
const Logs_1 = require("./modules/Logs");
const Proxy_1 = require("./modules/Proxy");
class DokkuSDK {
    apps;
    logs;
    proxy;
    constructor(config) {
        this.apps = new Apps_1.Apps(config);
        this.logs = new Logs_1.Logs(config);
        this.proxy = new Proxy_1.Proxy(config);
    }
    async disconnect() {
        await this.apps.disconnect();
        await this.logs.disconnect();
        await this.proxy.disconnect();
    }
}
exports.DokkuSDK = DokkuSDK;
//# sourceMappingURL=DokkuSDK.js.map