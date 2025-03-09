"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
const node_ssh_1 = require("node-ssh");
class BaseModule {
    config;
    ssh;
    connected = false;
    constructor(config) {
        this.config = config;
        this.ssh = new node_ssh_1.NodeSSH();
    }
    // Establish SSH Connection
    async connect() {
        if (this.connected)
            return;
        await this.ssh.connect(this.config);
        this.connected = true;
    }
    // Execute Commands (Returns stdout)
    async execute(command) {
        if (!this.connected)
            await this.connect();
        const result = await this.ssh.execCommand(command);
        if (result.stderr)
            throw new Error(result.stderr);
        return result.stdout.trim();
    }
    // Stream Long-running Commands
    async stream(command, onData) {
        if (!this.connected)
            await this.connect();
        return this.ssh.exec(command, [], {
            stream: 'both',
            onStdout: (chunk) => onData(chunk.toString()),
            onStderr: (chunk) => onData(chunk.toString()),
        });
    }
    async disconnect() {
        if (this.connected) {
            this.ssh.dispose();
            this.connected = false;
        }
    }
}
exports.BaseModule = BaseModule;
//# sourceMappingURL=BaseModule.js.map