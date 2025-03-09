import { NodeSSH } from 'node-ssh';
export interface SSHConfig {
    host: string;
    username: string;
    privateKey?: string;
    password?: string;
}
export declare class BaseModule {
    private config;
    protected ssh: NodeSSH;
    private connected;
    constructor(config: SSHConfig);
    connect(): Promise<void>;
    protected execute(command: string): Promise<string>;
    protected stream(command: string, onData: (data: string) => void): Promise<string>;
    disconnect(): Promise<void>;
}
