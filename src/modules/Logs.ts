// src/modules/Logs.ts
import { BaseModule } from './BaseModule';

export class Logs extends BaseModule {
  async get(app: string, lines = 100): Promise<string> {
    return this.execute(`dokku logs ${app} -n ${lines}`);
  }

  async stream(app: string, onData: (data: string) => void): Promise<any> {
    return this.stream(`dokku logs ${app} --tail`, onData);
  }
}
