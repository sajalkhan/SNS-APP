import { Application } from 'express';
import { authRoutes } from '@auth/routes/authRoutes';
import { serverAdapter } from '@service/queues/base.queue';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { currentUserRoutes } from '@auth/routes/currentUserRoutes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    app.use('/queues', serverAdapter.getRouter()); // this is only for check GUI of MQ
    app.use(BASE_PATH, authRoutes.getRouter());
    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.getRouter());
  };
  routes();
};
