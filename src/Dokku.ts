import { NodeSSH } from 'node-ssh';
import Queue from 'better-queue';
import type { SSHConfig } from './modules/BaseModule';
import { Apps } from './modules/Apps';
import { Logs } from './modules/Logs';

export class Dokku {
  private ssh: NodeSSH;
  private sshConfig: SSHConfig;
  private queue: Queue<() => Promise<unknown>, unknown>;

  public apps: Apps;
  public logs: Logs;

  constructor(sshConfig: SSHConfig) {
    this.ssh = new NodeSSH();
    this.sshConfig = sshConfig;

    // Command queue: ensures sequential execution
    this.queue = new Queue(
      async (task, cb) => {
        try {
          const result = await task();
          cb(null, result);
        } catch (err) {
          cb(err);
        }
      },
      {
        concurrent: 1, // Sequential execution
        maxRetries: 3, // Retry on failure
        retryDelay: 1000, // 1 second between retries
      },
    );

    // Instantiate sub-modules (Apps, Logs, etc.)
    this.apps = new Apps(this.ssh, this.queue);
    this.logs = new Logs(this.ssh, this.queue);
  }

  // Ensure SSH connection is established
  async connect(): Promise<void> {
    if (!this.ssh.isConnected()) {
      await this.ssh.connect(this.sshConfig);
    }
  }

  // Disconnect SSH session
  async disconnect(): Promise<void> {
    this.ssh.dispose();
  }
}
