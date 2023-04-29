import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public DB_PASSWORD: string = '';
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;

  private readonly DEFAULT_DATABASE_URL = `mongodb://sohrab:${this.DB_PASSWORD}@ac-9cnkrjh-shard-00-00.vba8ve3.mongodb.net:27017,ac-9cnkrjh-shard-00-01.vba8ve3.mongodb.net:27017,ac-9cnkrjh-shard-00-02.vba8ve3.mongodb.net:27017/?ssl=true&replicaSet=atlas-d7ewo6-shard-0&authSource=admin&retryWrites=true&w=majority`;

  constructor() {
    this.DB_PASSWORD = process.env.DB_PASSWORD || this.DB_PASSWORD;
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '123';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined!`);
      }
    }
  }
}

export const config: Config = new Config();
