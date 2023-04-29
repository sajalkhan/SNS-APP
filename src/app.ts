import express, { Express } from 'express';
import { SnsServer } from './setupServer';
import { ConnectDatabase } from './setupDatabase';
import { config } from './config';

class Application {
  public initialize(): void {
    this.loadConfig();
    ConnectDatabase();
    const app: Express = express();
    const server: SnsServer = new SnsServer(app);
    server.start();
  }

  public loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();
