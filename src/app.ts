import express, { Express } from 'express';
import { SnsServer } from './setupServer';

class Application {
  public initialize(): void {
    const app: Express = express();
    const server: SnsServer = new SnsServer(app);
    server.start();
  }
}

const application: Application = new Application();
application.initialize();
