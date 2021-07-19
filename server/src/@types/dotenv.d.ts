declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    APP_PORT: number;
    APP_HOST: string;
    JWT_PRIVATE_KEY: string;
    ENCRYPT_KEY: string;
    ENCRYPT_IV: string;
  }
}
