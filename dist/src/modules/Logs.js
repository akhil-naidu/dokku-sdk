"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
// src/modules/Logs.ts
const BaseModule_1 = require("./BaseModule");
class Logs extends BaseModule_1.BaseModule {
    async get(app, lines = 100) {
        return this.execute(`dokku logs ${app} -n ${lines}`);
    }
    async stream(app, onData) {
        return this.stream(`dokku logs ${app} --tail`, onData);
    }
}
exports.Logs = Logs;
//# sourceMappingURL=Logs.js.map