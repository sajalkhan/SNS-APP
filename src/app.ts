import express, { Express } from 'express';
import { config } from '@root/config';
import { SnsServer } from '@root/setupServer';
import { ConnectDatabase } from '@root/setupDatabase';

class Application {
  public async initialize(): Promise<void> {
    this.loadConfig();
    await ConnectDatabase();
    const app: Express = express();
    const server: SnsServer = new SnsServer(app);
    server.start();
  }

  public loadConfig(): void {
    config.validateConfig();
    config.cloudinaryConfig();
  }
}

const application: Application = new Application();
application.initialize();
