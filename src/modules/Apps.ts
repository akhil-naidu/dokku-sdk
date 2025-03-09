import { BaseModule } from './BaseModule';

export class Apps extends BaseModule {
  async list(): Promise<string[]> {
    const output = await this.execute('dokku apps:list');
    return output.split('\n').slice(1); // Skip header
  }

  async create(name: string): Promise<string> {
    return this.execute(`dokku apps:create ${name}`);
  }

  async destroy(name: string): Promise<string> {
    return this.execute(`dokku apps:destroy ${name} --force`);
  }
}
