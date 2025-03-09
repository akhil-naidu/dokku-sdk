// src/modules/Proxy.ts
import { BaseModule } from './BaseModule';

export class Proxy extends BaseModule {
  async addPort(app: string, scheme: 'http' | 'https', port: number) {
    return this.execute(`dokku proxy:ports-add ${app} ${scheme}:${port}`);
  }

  async listPorts(app: string): Promise<string> {
    return this.execute(`dokku proxy:ports ${app}`);
  }
}
