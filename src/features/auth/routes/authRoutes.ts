import { SignUp } from '@auth/controllers/signup';
import { SignIn } from '@auth/controllers/signin';
import { SignOut } from '@auth/controllers/signout';
import { Password } from '@auth/controllers/password-reset';
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
    const signOut = new SignOut();
    const password = new Password();

    this.router.post('/signup', (req, res) => signUp.create(req, res));
    this.router.get('/signin', (req, res) => signIn.read(req, res));
    this.router.get('/signout', (req, res) => signOut.update(req, res));
    this.router.post('/forgot-password', (req, res) => password.create(req, res));
    this.router.post('/reset-password/:token', (req, res) => password.update(req, res));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
