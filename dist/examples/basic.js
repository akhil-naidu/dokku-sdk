"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const dokku = new src_1.DokkuSDK({
    host: 'your.dokku.server',
    username: 'dokku-user',
    privateKey: '/path/to/id_rsa',
});
async function main() {
    try {
        // List apps
        console.log('📦 Apps:', await dokku.apps.list());
        // Create app
        await dokku.apps.create('my-test-app');
        console.log('🚀 Created app: my-test-app');
        // Stream logs
        console.log('📄 Streaming logs:');
        await dokku.logs.stream('my-test-app', (log) => {
            process.stdout.write(log);
        });
    }
    catch (error) {
        console.error('❌ Error:', error);
    }
    finally {
        await dokku.disconnect();
    }
}
main();
//# sourceMappingURL=basic.js.map