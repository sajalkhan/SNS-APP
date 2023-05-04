import { CurrentUser } from '@auth/controllers/current-user';
import { authMiddleware } from '@global/helpers/auth-middleware';
import express, { Router } from 'express';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    const currentUser = new CurrentUser();
    this.router.get('/currentuser', authMiddleware.checkAuthentication, (req, res) => currentUser.read(req, res));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
