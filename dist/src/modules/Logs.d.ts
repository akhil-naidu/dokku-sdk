import { BaseModule } from './BaseModule';
export declare class Logs extends BaseModule {
    get(app: string, lines?: number): Promise<string>;
    stream(app: string, onData: (data: string) => void): Promise<any>;
}
