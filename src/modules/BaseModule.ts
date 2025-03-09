import {
  NodeSSH,
  SSHExecCommandOptions,
  SSHExecCommandResponse,
} from 'node-ssh';

export interface SSHConfig {
  host: string;
  username: string;
  privateKey?: string;
  password?: string;
}

export class BaseModule {
  protected ssh: NodeSSH;
  private connected = false;

  constructor(private config: SSHConfig) {
    this.ssh = new NodeSSH();
  }

  // Establish SSH Connection
  async connect() {
    if (this.connected) return;
    await this.ssh.connect(this.config);
    this.connected = true;
  }

  // Execute Commands (Returns stdout)
  protected async execute(command: string): Promise<string> {
    if (!this.connected) await this.connect();
    const result = await this.ssh.execCommand(command);
    if (result.stderr) throw new Error(result.stderr);
    return result.stdout.trim();
  }

  // Stream Long-running Commands
  protected async stream(command: string, onData: (data: string) => void) {
    if (!this.connected) await this.connect();
    return this.ssh.exec(command, [], {
      stream: 'both',
      onStdout: (chunk) => onData(chunk.toString()),
      onStderr: (chunk) => onData(chunk.toString()),
    } as SSHExecCommandOptions);
  }

  async disconnect() {
    if (this.connected) {
      this.ssh.dispose();
      this.connected = false;
    }
  }
}
