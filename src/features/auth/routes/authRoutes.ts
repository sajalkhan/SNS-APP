import { SignUp } from '@auth/controllers/signup';
import { SignIn } from '@auth/controllers/signin';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    const signUp = new SignUp();
    const signIn = new SignIn();

    this.router.post('/signup', (req, res) => signUp.create(req, res));
    this.router.post('/signin', (req, res) => signIn.read(req, res));

    // other routes can be added here
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
