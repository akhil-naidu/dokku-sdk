"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proxy = void 0;
// src/modules/Proxy.ts
const BaseModule_1 = require("./BaseModule");
class Proxy extends BaseModule_1.BaseModule {
    async addPort(app, scheme, port) {
        return this.execute(`dokku proxy:ports-add ${app} ${scheme}:${port}`);
    }
    async listPorts(app) {
        return this.execute(`dokku proxy:ports ${app}`);
    }
}
exports.Proxy = Proxy;
//# sourceMappingURL=Proxy.js.map