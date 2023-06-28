import express, { Router } from 'express';
import { Add } from '@reaction/controllers/add-reactions';
import { authMiddleware } from '@global/helpers/auth-middleware';

class ReactionRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/post/reaction', authMiddleware.checkAuthentication, Add.prototype.reaction);

    return this.router;
  }
}

export const reactionRoutes: ReactionRoutes = new ReactionRoutes();
