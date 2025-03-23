// import { Dokku, SSHConfig } from 'dokku-sdk';
import { Dokku, SSHConfig } from '../src';

// Initialize the SDK with SSH credentials
const sshConfig: SSHConfig = {
  host: 'your-dokku-server',
  username: 'dokku',
  privateKey: '/path/to/private/key',
};

const dokku = new Dokku(sshConfig);

async function main() {
  try {
    await dokku.connect();

    // Create a new Dokku app
    await dokku.apps.create('my-new-app');
    console.log('✅ App created!');

    // List all Dokku apps
    const appList = await dokku.apps.list();
    console.log('📦 Current Apps:', appList);

    // Stream app logs in real-time
    console.log('📊 Streaming logs:');
    await dokku.logs.stream('my-new-app', (data) => process.stdout.write(data));
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await dokku.disconnect();
  }
}

main();
