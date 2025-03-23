// src/modules/BaseModule.ts
import { NodeSSH } from 'node-ssh';
import Queue from 'better-queue';

export type SSHConfig = {
  host: string;
  username: string;
  privateKey: string;
  port?: number; // Optional SSH port (default: 22)
};

export abstract class BaseModule {
  protected ssh: NodeSSH;
  protected queue: Queue<() => Promise<unknown>, unknown>;

  constructor(ssh: NodeSSH, queue: Queue<() => Promise<unknown>, unknown>) {
    this.ssh = ssh;
    this.queue = queue;
  }

  protected async execute(command: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.queue.push(
        async () => {
          if (!this.ssh.isConnected()) {
            throw new Error('SSH connection is not established.');
          }
          const result = await this.ssh.execCommand(command);
          if (result.stderr) throw new Error(result.stderr);
          return result.stdout.trim();
        },
        (err, result) => (err ? reject(err) : resolve(result as string)),
      );
    });
  }

  protected async stream(
    command: string,
    onData: (data: string) => void,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.queue.push(
        async () => {
          if (!this.ssh.isConnected()) {
            throw new Error('SSH connection is not established.');
          }

          this.ssh.exec(command, [], {
            stream: 'both',
            onStdout: (chunk) => onData(chunk.toString()),
            onStderr: (chunk) => onData(chunk.toString()),
          });

          return new Promise<void>((res) => setTimeout(res, 5000)); // Keep stream alive
        },
        (err) => (err ? reject(err) : resolve()),
      );
    });
  }
}
