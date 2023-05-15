import { Get } from '@post/controllers/get-post';
import { Create } from '@post/controllers/create-post';
import { Update } from '@post/controllers/update-post';
import { Delete } from '@post/controllers/delete-post';
import { authMiddleware } from '@global/helpers/auth-middleware';
import express, { Router } from 'express';

class PostRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    this.router.get('/post/all/:page', authMiddleware.checkAuthentication, Get.prototype.posts);
    this.router.get('/post/images/:page', authMiddleware.checkAuthentication, Get.prototype.postsWithImages);

    this.router.post('/post', authMiddleware.checkAuthentication, Create.prototype.post);
    this.router.post('/post/image/post', authMiddleware.checkAuthentication, Create.prototype.postWithImage);

    this.router.put('/post/:postId', authMiddleware.checkAuthentication, Update.prototype.posts);
    this.router.put('/post/image/:postId', authMiddleware.checkAuthentication, Update.prototype.postWithImage);

    this.router.delete('/post/:postId', authMiddleware.checkAuthentication, Delete.prototype.post);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const postRoutes: PostRoutes = new PostRoutes();
