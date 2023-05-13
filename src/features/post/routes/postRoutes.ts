import { Create } from '@post/controllers/create-post';
import { authMiddleware } from '@global/helpers/auth-middleware';
import express, { Router } from 'express';

class PostRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    this.router.post('/post', authMiddleware.checkAuthentication, Create.prototype.post);
    this.router.post('/post/image/post', authMiddleware.checkAuthentication, Create.prototype.postWithImage);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const postRoutes: PostRoutes = new PostRoutes();
