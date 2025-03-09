// src/DokkuSDK.ts
import { SSHConfig } from './modules/BaseModule';
import { Apps } from './modules/Apps';
import { Logs } from './modules/Logs';
import { Proxy } from './modules/Proxy';

export class DokkuSDK {
  public apps: Apps;
  public logs: Logs;
  public proxy: Proxy;

  constructor(config: SSHConfig) {
    this.apps = new Apps(config);
    this.logs = new Logs(config);
    this.proxy = new Proxy(config);
  }

  async disconnect() {
    await this.apps.disconnect();
    await this.logs.disconnect();
    await this.proxy.disconnect();
  }
}
