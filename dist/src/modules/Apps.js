"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apps = void 0;
const BaseModule_1 = require("./BaseModule");
class Apps extends BaseModule_1.BaseModule {
    async list() {
        const output = await this.execute('dokku apps:list');
        return output.split('\n').slice(1); // Skip header
    }
    async create(name) {
        return this.execute(`dokku apps:create ${name}`);
    }
    async destroy(name) {
        return this.execute(`dokku apps:destroy ${name} --force`);
    }
}
exports.Apps = Apps;
//# sourceMappingURL=Apps.js.map