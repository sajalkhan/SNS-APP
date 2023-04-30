import { SignUp } from '@auth/controllers/signup';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    const signUp = new SignUp();

    this.router.post('/signup', (req, res) => signUp.create(req, res));

    // other routes can be added here
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
