import { BaseModule } from './BaseModule';
export declare class Apps extends BaseModule {
    list(): Promise<string[]>;
    create(name: string): Promise<string>;
    destroy(name: string): Promise<string>;
}
