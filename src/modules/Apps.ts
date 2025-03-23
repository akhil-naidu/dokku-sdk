import { BaseModule } from './BaseModule';

export class Apps extends BaseModule {
  async list(): Promise<string[]> {
    const output = await this.execute('dokku apps:list');
    return output.split('\n').filter((line) => line.trim() !== '');
  }

  async create(app: string): Promise<string> {
    return this.execute(`dokku apps:create ${app}`);
  }

  async destroy(app: string, force = false): Promise<string> {
    return this.execute(`dokku apps:destroy ${app} ${force ? '--force' : ''}`);
  }
}
