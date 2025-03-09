import { BaseModule } from './BaseModule';
export declare class Proxy extends BaseModule {
    addPort(app: string, scheme: 'http' | 'https', port: number): Promise<string>;
    listPorts(app: string): Promise<string>;
}
